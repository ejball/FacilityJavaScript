using System;
using System.Globalization;
using System.Linq;
using System.Net;
using Facility.Definition;
using Facility.Definition.CodeGen;
using Facility.Definition.Http;

namespace Facility.JavaScript
{
	/// <summary>
	/// Generates JavaScript and TypeScript.
	/// </summary>
	public sealed class JavaScriptGenerator : CodeGenerator
	{
		/// <summary>
		/// The name of the module (optional).
		/// </summary>
		public string ModuleName { get; set; }

		/// <summary>
		/// True to generate TypeScript.
		/// </summary>
		public bool TypeScript { get; set; }

		/// <summary>
		/// Generates the C# output.
		/// </summary>
		protected override CodeGenOutput GenerateOutputCore(ServiceInfo service)
		{
			var httpServiceInfo = new HttpServiceInfo(service);

			string moduleName = ModuleName ?? service.Name;
			string capModuleName = CodeGenUtility.Capitalize(moduleName);

			return new CodeGenOutput(CreateNamedText(Uncapitalize(moduleName) + (TypeScript ? ".ts" : ".js"), code =>
			{
				code.WriteLine($"// DO NOT EDIT: generated by {GeneratorName}");

				if (!TypeScript)
					code.WriteLine("'use strict';");

				code.WriteLine();
				code.WriteLine("import { HttpClientUtility" + IfTypeScript(", IServiceResult, IServiceError, IHttpClientOptions") + " } from 'facility-core';");

				code.WriteLine();
				WriteSummary(code, $"Provides access to {capModuleName} over HTTP via fetch.");
				using (code.Block("export function createHttpClient({ fetch, baseUri }" + IfTypeScript(": IHttpClientOptions") + ")" + IfTypeScript($": I{capModuleName}") + " {", "}"))
					code.WriteLine($"return new {capModuleName}HttpClient(fetch, baseUri);");

				if (TypeScript)
				{
					code.WriteLine();
					WriteSummary(code, service.Summary);
					using (code.Block($"export interface I{capModuleName} {{", "}"))
					{
						foreach (var httpMethodInfo in httpServiceInfo.Methods)
						{
							string methodName = httpMethodInfo.ServiceMethod.Name;
							string capMethodName = CodeGenUtility.Capitalize(methodName);
							WriteSummary(code, httpMethodInfo.ServiceMethod.Summary);
							code.WriteLine($"{methodName}(request: I{capMethodName}Request): Promise<IServiceResult<I{capMethodName}Response>>;");
						}
					}

					foreach (var methodInfo in service.Methods)
					{
						WriteDto(code, new ServiceDtoInfo(
							name: $"{CodeGenUtility.Capitalize(methodInfo.Name)}Request",
							fields: methodInfo.RequestFields,
							summary: $"Request for {CodeGenUtility.Capitalize(methodInfo.Name)}.",
							position: methodInfo.Position), service);

						WriteDto(code, new ServiceDtoInfo(
							name: $"{CodeGenUtility.Capitalize(methodInfo.Name)}Response",
							fields: methodInfo.ResponseFields,
							summary: $"Response for {CodeGenUtility.Capitalize(methodInfo.Name)}.",
							position: methodInfo.Position), service);
					}

					foreach (var dtoInfo in service.Dtos)
						WriteDto(code, dtoInfo, service);
				}

				code.WriteLine();
				code.WriteLine("const { fetchResponse, createResponseError, createRequiredRequestFieldError } = HttpClientUtility;");
				if (TypeScript)
				{
					code.WriteLine("type IFetch = HttpClientUtility.IFetch;");
					code.WriteLine("type IFetchRequest = HttpClientUtility.IFetchRequest;");
				}

				code.WriteLine();
				using (code.Block($"class {capModuleName}HttpClient" + IfTypeScript($" implements I{capModuleName}") + " {", "}"))
				{
					using (code.Block("constructor(fetch" + IfTypeScript(": IFetch") + ", baseUri" + IfTypeScript(": string") + ") {", "}"))
					{
						using (code.Block("if (typeof fetch !== 'function') {", "}"))
							code.WriteLine("throw new TypeError('fetch must be a function.');");
						using (code.Block("if (typeof baseUri === 'undefined') {", "}"))
							code.WriteLine($"baseUri = '{httpServiceInfo.Url ?? ""}';");
						using (code.Block(@"if (/[^\/]$/.test(baseUri)) {", "}"))
							code.WriteLine("baseUri += '/';");

						code.WriteLine("this._fetch = fetch;");
						code.WriteLine("this._baseUri = baseUri;");
					}

					foreach (var httpMethodInfo in httpServiceInfo.Methods)
					{
						string methodName = httpMethodInfo.ServiceMethod.Name;
						string capMethodName = CodeGenUtility.Capitalize(methodName);

						WriteSummary(code, httpMethodInfo.ServiceMethod.Summary);
						using (code.Block(IfTypeScript("public ") + $"{methodName}(request" + IfTypeScript($": I{capMethodName}Request") + ")" + IfTypeScript($": Promise<IServiceResult<I{capMethodName}Response>>") + " {", "}"))
						{
							bool hasPathFields = httpMethodInfo.PathFields.Count != 0;
							string jsUriDelim = hasPathFields ? "`" : "'";
							string jsUri = jsUriDelim + httpMethodInfo.Path.Substring(1) + jsUriDelim;
							if (hasPathFields)
							{
								foreach (var httpPathField in httpMethodInfo.PathFields)
								{
									code.WriteLine($"const uriPart{CodeGenUtility.Capitalize(httpPathField.ServiceField.Name)} = request.{httpPathField.ServiceField.Name} != null && {RenderUriComponent(httpPathField.ServiceField, service)};");
									using (code.Block($"if (!uriPart{CodeGenUtility.Capitalize(httpPathField.ServiceField.Name)}) {{", "}"))
										code.WriteLine($"return Promise.resolve(createRequiredRequestFieldError('{httpPathField.ServiceField.Name}'));");
								}
								foreach (var httpPathField in httpMethodInfo.PathFields)
									jsUri = jsUri.Replace("{" + httpPathField.ServiceField.Name + "}", $"${{uriPart{CodeGenUtility.Capitalize(httpPathField.ServiceField.Name)}}}");
							}

							bool hasQueryFields = httpMethodInfo.QueryFields.Count != 0;
							code.WriteLine((hasQueryFields ? "let" : "const") + $" uri = {jsUri};");
							if (hasQueryFields)
							{
								code.WriteLine("const query" + IfTypeScript(": string[]") + " = [];");
								foreach (var httpQueryField in httpMethodInfo.QueryFields)
									code.WriteLine($"request.{httpQueryField.ServiceField.Name} == null || query.push('{httpQueryField.Name}=' + {RenderUriComponent(httpQueryField.ServiceField, service)});");
								using (code.Block("if (query.length) {", "}"))
									code.WriteLine("uri = uri + '?' + query.join('&');");
							}

							using (code.Block("const fetchRequest" + IfTypeScript(": IFetchRequest") + " = {", "};"))
							{
								if (httpMethodInfo.RequestBodyField == null && httpMethodInfo.RequestNormalFields.Count == 0)
								{
									code.WriteLine($"method: '{httpMethodInfo.Method}'");
								}
								else
								{
									code.WriteLine($"method: '{httpMethodInfo.Method}',");
									code.WriteLine("headers: { 'Content-Type': 'application/json' },");

									if (httpMethodInfo.RequestBodyField != null)
									{
										code.WriteLine($"body: JSON.stringify(request.{httpMethodInfo.RequestBodyField.ServiceField.Name})");
									}
									else if (httpMethodInfo.ServiceMethod.RequestFields.Count == httpMethodInfo.RequestNormalFields.Count)
									{
										code.WriteLine("body: JSON.stringify(request)");
									}
									else
									{
										using (code.Block("body: JSON.stringify({", "})"))
										{
											for (int httpFieldIndex = 0; httpFieldIndex < httpMethodInfo.RequestNormalFields.Count; httpFieldIndex++)
											{
												var httpFieldInfo = httpMethodInfo.RequestNormalFields[httpFieldIndex];
												bool isLastField = httpFieldIndex == httpMethodInfo.RequestNormalFields.Count - 1;
												string fieldName = httpFieldInfo.ServiceField.Name;
												code.WriteLine(fieldName + ": request." + fieldName + (isLastField ? "" : ","));
											}
										}
									}
								}
							}

							if (httpMethodInfo.RequestHeaderFields.Count != 0)
							{
								foreach (var httpHeaderField in httpMethodInfo.RequestHeaderFields)
								{
									using (code.Block($"if (request.{httpHeaderField.ServiceField.Name} != null) {{", "}"))
										code.WriteLine($"fetchRequest.headers['{httpHeaderField.Name}'] = request.{httpHeaderField.ServiceField.Name};");
								}
							}

							code.WriteLine("return fetchResponse(this._fetch, this._baseUri + uri, fetchRequest)");
							using (code.Indent())
							using (code.Block(".then(result => {", "});"))
							{
								code.WriteLine("const status = result.response.status;");
								code.WriteLine("let value" + IfTypeScript($": I{capMethodName}Response") + " = null;");
								using (code.Block($"if (result.json) {{", "}"))
								{
									var validResponses = httpMethodInfo.ValidResponses;
									string elsePrefix = "";
									foreach (var validResponse in validResponses)
									{
										string statusCodeAsString = ((int) validResponse.StatusCode).ToString(CultureInfo.InvariantCulture);
										if ((validResponse.StatusCode == HttpStatusCode.OK && validResponses.All(x => x.StatusCode != HttpStatusCode.NoContent)) ||
											(validResponse.StatusCode == HttpStatusCode.NoContent && validResponses.All(x => x.StatusCode != HttpStatusCode.OK)))
										{
											code.WriteLine($"{elsePrefix}if (status === 200 || status === 204) {{");
										}
										else
										{
											code.WriteLine($"{elsePrefix}if (status === {statusCodeAsString}) {{");
										}
										elsePrefix = "else ";

										using (code.Indent())
										{
											var bodyField = validResponse.BodyField;
											if (bodyField != null)
											{
												string responseBodyFieldName = bodyField.ServiceField.Name;

												var bodyFieldType = service.GetFieldType(bodyField.ServiceField);
												if (bodyFieldType.Kind == ServiceTypeKind.Boolean)
												{
													code.WriteLine($"value = {{ {responseBodyFieldName}: true }};");
												}
												else
												{
													if (bodyFieldType.Dto.Fields.Count == 0)
														code.WriteLine($"value = {{ {responseBodyFieldName}: {{}} }};");
													else
														code.WriteLine($"value = {{ {responseBodyFieldName}: result.json }};");
												}
											}
											else
											{
												if (validResponse.NormalFields.Count == 0)
													code.WriteLine("value = {};");
												else
													code.WriteLine("value = result.json;");
											}
										}
										code.WriteLine("}");
									}
								}

								using (code.Block("if (!value) {", "}"))
									code.WriteLine("return createResponseError(status, result.json)" + IfTypeScript($" as IServiceResult<I{capMethodName}Response>") + ";");

								if (httpMethodInfo.ResponseHeaderFields.Count != 0)
								{
									code.WriteLine("let headerValue" + IfTypeScript(": string") + ";");
									foreach (var httpHeaderField in httpMethodInfo.ResponseHeaderFields)
									{
										code.WriteLine($"headerValue = result.response.headers.get('{httpHeaderField.Name}');");
										using (code.Block("if (headerValue != null) {", "}"))
											code.WriteLine($"value.{httpHeaderField.Name} = headerValue;");
									}
								}

								code.WriteLine("return { value: value };");
							}
						}
					}

					if (TypeScript)
					{
						code.WriteLine("private _fetch: IFetch;");
						code.WriteLine("private _baseUri: string;");
					}
				}
			}));
		}

		private void WriteDto(CodeWriter code, ServiceDtoInfo dtoInfo, ServiceInfo service)
		{
			code.WriteLine();
			WriteSummary(code, dtoInfo.Summary);
			using (code.Block($"export interface I{CodeGenUtility.Capitalize(dtoInfo.Name)} {{", "}"))
			{
				foreach (var fieldInfo in dtoInfo.Fields)
				{
					WriteSummary(code, fieldInfo.Summary);
					code.WriteLine($"{fieldInfo.Name}?: {RenderFieldType(service.GetFieldType(fieldInfo))};");
				}
			}
		}

		private string IfTypeScript(string value)
		{
			return TypeScript ? value : "";
		}

		private string RenderFieldType(ServiceTypeInfo fieldType)
		{
			switch (fieldType.Kind)
			{
			case ServiceTypeKind.String:
			case ServiceTypeKind.Bytes:
			case ServiceTypeKind.Enum:
				return "string";
			case ServiceTypeKind.Boolean:
				return "boolean";
			case ServiceTypeKind.Double:
			case ServiceTypeKind.Int32:
			case ServiceTypeKind.Int64:
				return "number";
			case ServiceTypeKind.Object:
				return "{ [name: string]: any }";
			case ServiceTypeKind.Error:
				return "IServiceError";
			case ServiceTypeKind.Dto:
				return $"I{CodeGenUtility.Capitalize(fieldType.Dto.Name)}";
			case ServiceTypeKind.Result:
				return $"IServiceResult<{RenderFieldType(fieldType.ValueType)}>";
			case ServiceTypeKind.Array:
				return $"{RenderFieldType(fieldType.ValueType)}[]";
			case ServiceTypeKind.Map:
				return $"{{ [name: string]: {RenderFieldType(fieldType.ValueType)} }}";
			default:
				throw new NotSupportedException("Unknown field type " + fieldType.Kind);
			}
		}

		private string RenderUriComponent(ServiceFieldInfo field, ServiceInfo service)
		{
			var fieldTypeKind = service.GetFieldType(field).Kind;
			var fieldName = field.Name;

			switch (fieldTypeKind)
			{
			case ServiceTypeKind.Enum:
				return $"request.{fieldName}";
			case ServiceTypeKind.String:
			case ServiceTypeKind.Bytes:
				return $"encodeURIComponent(request.{fieldName})";
			case ServiceTypeKind.Boolean:
			case ServiceTypeKind.Int32:
			case ServiceTypeKind.Int64:
				return $"request.{fieldName}.toString()";
			case ServiceTypeKind.Double:
				return $"encodeURIComponent(request.{fieldName}.toString())";
			case ServiceTypeKind.Dto:
			case ServiceTypeKind.Error:
			case ServiceTypeKind.Object:
				throw new NotSupportedException("Field type not supported on path/query: " + fieldTypeKind);
			default:
				throw new NotSupportedException("Unknown field type " + fieldTypeKind);
			}
		}

		private static void WriteSummary(CodeWriter code, string summary)
		{
			if (!string.IsNullOrWhiteSpace(summary))
				code.WriteLine($"/** {summary} */");
		}

		private static string Uncapitalize(string value)
		{
			return value.Length == 0 ? "" : value.Substring(0, 1).ToLowerInvariant() + value.Substring(1);
		}
	}
}
