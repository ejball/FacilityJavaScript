// DO NOT EDIT: generated by fsdgenjs

import { HttpClientUtility, IServiceResult, IServiceError, IHttpClientOptions } from 'facility-core';

/** Provides access to ExampleApi over HTTP via fetch. */
export function createHttpClient({ fetch, baseUri }: IHttpClientOptions): IExampleApi {
	return new ExampleApiHttpClient(fetch, baseUri);
}

/** Example service for widgets. */
export interface IExampleApi {
	/** Gets widgets. */
	getWidgets(request: IGetWidgetsRequest): Promise<IServiceResult<IGetWidgetsResponse>>;
	/** Creates a new widget. */
	createWidget(request: ICreateWidgetRequest): Promise<IServiceResult<ICreateWidgetResponse>>;
	/** Gets the specified widget. */
	getWidget(request: IGetWidgetRequest): Promise<IServiceResult<IGetWidgetResponse>>;
	/** Deletes the specified widget. */
	deleteWidget(request: IDeleteWidgetRequest): Promise<IServiceResult<IDeleteWidgetResponse>>;
	/** Edits widget. */
	editWidget(request: IEditWidgetRequest): Promise<IServiceResult<IEditWidgetResponse>>;
	/** Gets the specified widgets. */
	getWidgetBatch(request: IGetWidgetBatchRequest): Promise<IServiceResult<IGetWidgetBatchResponse>>;
	/** Gets the widget weight. */
	getWidgetWeight(request: IGetWidgetWeightRequest): Promise<IServiceResult<IGetWidgetWeightResponse>>;
	/** Gets a widget preference. */
	getPreference(request: IGetPreferenceRequest): Promise<IServiceResult<IGetPreferenceResponse>>;
	/** Sets a widget preference. */
	setPreference(request: ISetPreferenceRequest): Promise<IServiceResult<ISetPreferenceResponse>>;
	/** Gets service info. */
	getInfo(request: IGetInfoRequest): Promise<IServiceResult<IGetInfoResponse>>;
	/** Demonstrates the default HTTP behavior. */
	notRestful(request: INotRestfulRequest): Promise<IServiceResult<INotRestfulResponse>>;
	kitchen(request: IKitchenRequest): Promise<IServiceResult<IKitchenResponse>>;
}

/** Request for GetWidgets. */
export interface IGetWidgetsRequest {
	/** The query. */
	query?: string;
	/** The limit of returned results. */
	limit?: number;
	/** The sort field. */
	sort?: string;
	/** True to sort descending. */
	desc?: boolean;
	/** The maximum weight. */
	maxWeight?: number;
}

/** Response for GetWidgets. */
export interface IGetWidgetsResponse {
	/** The widgets. */
	widgets?: IWidget[];
	/** The total number of widgets. */
	total?: number;
	/** The total weight. */
	totalWeight?: number;
	/** The pending job. */
	job?: IWidgetJob;
}

/** Request for CreateWidget. */
export interface ICreateWidgetRequest {
	/** The widget to create. */
	widget?: IWidget;
}

/** Response for CreateWidget. */
export interface ICreateWidgetResponse {
	/** The created widget. */
	widget?: IWidget;
}

/** Request for GetWidget. */
export interface IGetWidgetRequest {
	/** The widget ID. */
	id?: string;
	ifNoneMatch?: string;
}

/** Response for GetWidget. */
export interface IGetWidgetResponse {
	/** The requested widget. */
	widget?: IWidget;
	eTag?: string;
	notModified?: boolean;
}

/** Request for DeleteWidget. */
export interface IDeleteWidgetRequest {
	/** The widget ID. */
	id?: string;
}

/** Response for DeleteWidget. */
export interface IDeleteWidgetResponse {
}

/** Request for EditWidget. */
export interface IEditWidgetRequest {
	/** The widget ID. */
	id?: string;
	/** The operations. */
	ops?: { [name: string]: any }[];
	/** The new weight. */
	weight?: number;
}

/** Response for EditWidget. */
export interface IEditWidgetResponse {
	/** The edited widget. */
	widget?: IWidget;
	/** The pending job. */
	job?: IWidgetJob;
}

/** Request for GetWidgetBatch. */
export interface IGetWidgetBatchRequest {
	/** The IDs of the widgets to return. */
	ids?: string[];
}

/** Response for GetWidgetBatch. */
export interface IGetWidgetBatchResponse {
	/** The widget results. */
	results?: IServiceResult<IWidget>[];
}

/** Request for GetWidgetWeight. */
export interface IGetWidgetWeightRequest {
	/** The widget ID. */
	id?: string;
}

/** Response for GetWidgetWeight. */
export interface IGetWidgetWeightResponse {
	/** The widget weight. */
	value?: number;
}

/** Request for GetPreference. */
export interface IGetPreferenceRequest {
	/** The preference key. */
	key?: string;
}

/** Response for GetPreference. */
export interface IGetPreferenceResponse {
	/** The preference value. */
	value?: IPreference;
}

/** Request for SetPreference. */
export interface ISetPreferenceRequest {
	/** The preference key. */
	key?: string;
	/** The preference value. */
	value?: IPreference;
}

/** Response for SetPreference. */
export interface ISetPreferenceResponse {
	/** The preference value. */
	value?: IPreference;
}

/** Request for GetInfo. */
export interface IGetInfoRequest {
}

/** Response for GetInfo. */
export interface IGetInfoResponse {
	/** The name of the service. */
	name?: string;
}

/** Request for NotRestful. */
export interface INotRestfulRequest {
}

/** Response for NotRestful. */
export interface INotRestfulResponse {
}

/** Request for Kitchen. */
export interface IKitchenRequest {
	sink?: IKitchenSink;
}

/** Response for Kitchen. */
export interface IKitchenResponse {
}

/** A widget. */
export interface IWidget {
	/** A unique identifier for the widget. */
	id?: string;
	/** The name of the widget. */
	name?: string;
	/** The weight of the widget. */
	weight?: number;
}

/** A widget job. */
export interface IWidgetJob {
	/** A unique identifier for the widget job. */
	id?: string;
}

/** A preference. */
export interface IPreference {
	boolean?: boolean;
	booleans?: boolean[];
	double?: number;
	doubles?: number[];
	integer?: number;
	integers?: number[];
	string?: string;
	strings?: string[];
	bytes?: string;
	byteses?: string[];
	widgetField?: string;
	widgetFields?: string[];
	widget?: IWidget;
	widgets?: IWidget[];
	result?: IServiceResult<IWidget>;
	results?: IServiceResult<IWidget>[];
	bigInteger?: number;
	bigIntegers?: number[];
	error?: IServiceError;
	errors?: IServiceError[];
	object?: { [name: string]: any };
	objects?: { [name: string]: any }[];
	namedStrings?: { [name: string]: string };
	namedWidgets?: { [name: string]: IWidget };
}

/** An obsolete DTO. */
export interface IObsoleteData {
	unused?: boolean;
}

export interface IKitchenSink {
	oldField?: string;
}

const { fetchResponse, createResponseError, createRequiredRequestFieldError } = HttpClientUtility;
type IFetch = HttpClientUtility.IFetch;
type IFetchRequest = HttpClientUtility.IFetchRequest;

class ExampleApiHttpClient implements IExampleApi {
	constructor(fetch: IFetch, baseUri: string) {
		if (typeof fetch !== 'function') {
			throw new TypeError('fetch must be a function.');
		}
		if (typeof baseUri === 'undefined') {
			baseUri = 'http://local.example.com/v1';
		}
		if (/[^\/]$/.test(baseUri)) {
			baseUri += '/';
		}
		this._fetch = fetch;
		this._baseUri = baseUri;
	}
	/** Gets widgets. */
	public getWidgets(request: IGetWidgetsRequest): Promise<IServiceResult<IGetWidgetsResponse>> {
		let uri = 'widgets';
		const query: string[] = [];
		request.query == null || query.push('q=' + encodeURIComponent(request.query));
		request.limit == null || query.push('limit=' + request.limit.toString());
		request.sort == null || query.push('sort=' + request.sort);
		request.desc == null || query.push('desc=' + request.desc.toString());
		request.maxWeight == null || query.push('maxWeight=' + encodeURIComponent(request.maxWeight.toString()));
		if (query.length) {
			uri = uri + '?' + query.join('&');
		}
		const fetchRequest: IFetchRequest = {
			method: 'GET'
		};
		return fetchResponse(this._fetch, this._baseUri + uri, fetchRequest)
			.then(result => {
				const status = result.response.status;
				let value: IGetWidgetsResponse = null;
				if (result.json) {
					if (status === 200 || status === 204) {
						value = result.json;
					}
					else if (status === 202) {
						value = { job: result.json };
					}
				}
				if (!value) {
					return createResponseError(status, result.json) as IServiceResult<IGetWidgetsResponse>;
				}
				return { value: value };
			});
	}
	/** Creates a new widget. */
	public createWidget(request: ICreateWidgetRequest): Promise<IServiceResult<ICreateWidgetResponse>> {
		const uri = 'widgets';
		const fetchRequest: IFetchRequest = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(request.widget)
		};
		return fetchResponse(this._fetch, this._baseUri + uri, fetchRequest)
			.then(result => {
				const status = result.response.status;
				let value: ICreateWidgetResponse = null;
				if (result.json) {
					if (status === 201) {
						value = { widget: result.json };
					}
				}
				if (!value) {
					return createResponseError(status, result.json) as IServiceResult<ICreateWidgetResponse>;
				}
				return { value: value };
			});
	}
	/** Gets the specified widget. */
	public getWidget(request: IGetWidgetRequest): Promise<IServiceResult<IGetWidgetResponse>> {
		const uriPartId = request.id != null && encodeURIComponent(request.id);
		if (!uriPartId) {
			return Promise.resolve(createRequiredRequestFieldError('id'));
		}
		const uri = `widgets/${uriPartId}`;
		const fetchRequest: IFetchRequest = {
			method: 'GET'
		};
		if (request.ifNoneMatch != null) {
			fetchRequest.headers['If-None-Match'] = request.ifNoneMatch;
		}
		return fetchResponse(this._fetch, this._baseUri + uri, fetchRequest)
			.then(result => {
				const status = result.response.status;
				let value: IGetWidgetResponse = null;
				if (result.json) {
					if (status === 200 || status === 204) {
						value = { widget: result.json };
					}
					else if (status === 304) {
						value = { notModified: true };
					}
				}
				if (!value) {
					return createResponseError(status, result.json) as IServiceResult<IGetWidgetResponse>;
				}
				let headerValue: string;
				headerValue = result.response.headers.get('eTag');
				if (headerValue != null) {
					value.eTag = headerValue;
				}
				return { value: value };
			});
	}
	/** Deletes the specified widget. */
	public deleteWidget(request: IDeleteWidgetRequest): Promise<IServiceResult<IDeleteWidgetResponse>> {
		const uriPartId = request.id != null && encodeURIComponent(request.id);
		if (!uriPartId) {
			return Promise.resolve(createRequiredRequestFieldError('id'));
		}
		const uri = `widgets/${uriPartId}`;
		const fetchRequest: IFetchRequest = {
			method: 'DELETE'
		};
		return fetchResponse(this._fetch, this._baseUri + uri, fetchRequest)
			.then(result => {
				const status = result.response.status;
				let value: IDeleteWidgetResponse = null;
				if (result.json) {
					if (status === 200 || status === 204) {
						value = {};
					}
				}
				if (!value) {
					return createResponseError(status, result.json) as IServiceResult<IDeleteWidgetResponse>;
				}
				return { value: value };
			});
	}
	/** Edits widget. */
	public editWidget(request: IEditWidgetRequest): Promise<IServiceResult<IEditWidgetResponse>> {
		const uriPartId = request.id != null && encodeURIComponent(request.id);
		if (!uriPartId) {
			return Promise.resolve(createRequiredRequestFieldError('id'));
		}
		const uri = `widgets/${uriPartId}`;
		const fetchRequest: IFetchRequest = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				ops: request.ops,
				weight: request.weight
			})
		};
		return fetchResponse(this._fetch, this._baseUri + uri, fetchRequest)
			.then(result => {
				const status = result.response.status;
				let value: IEditWidgetResponse = null;
				if (result.json) {
					if (status === 200 || status === 204) {
						value = { widget: result.json };
					}
					else if (status === 202) {
						value = { job: result.json };
					}
				}
				if (!value) {
					return createResponseError(status, result.json) as IServiceResult<IEditWidgetResponse>;
				}
				return { value: value };
			});
	}
	/** Gets the specified widgets. */
	public getWidgetBatch(request: IGetWidgetBatchRequest): Promise<IServiceResult<IGetWidgetBatchResponse>> {
		const uri = 'widgets/get';
		const fetchRequest: IFetchRequest = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(request)
		};
		return fetchResponse(this._fetch, this._baseUri + uri, fetchRequest)
			.then(result => {
				const status = result.response.status;
				let value: IGetWidgetBatchResponse = null;
				if (result.json) {
					if (status === 200 || status === 204) {
						value = result.json;
					}
				}
				if (!value) {
					return createResponseError(status, result.json) as IServiceResult<IGetWidgetBatchResponse>;
				}
				return { value: value };
			});
	}
	/** Gets the widget weight. */
	public getWidgetWeight(request: IGetWidgetWeightRequest): Promise<IServiceResult<IGetWidgetWeightResponse>> {
		const uriPartId = request.id != null && encodeURIComponent(request.id);
		if (!uriPartId) {
			return Promise.resolve(createRequiredRequestFieldError('id'));
		}
		const uri = `widgets/${uriPartId}/weight`;
		const fetchRequest: IFetchRequest = {
			method: 'GET'
		};
		return fetchResponse(this._fetch, this._baseUri + uri, fetchRequest)
			.then(result => {
				const status = result.response.status;
				let value: IGetWidgetWeightResponse = null;
				if (result.json) {
					if (status === 200 || status === 204) {
						value = result.json;
					}
				}
				if (!value) {
					return createResponseError(status, result.json) as IServiceResult<IGetWidgetWeightResponse>;
				}
				return { value: value };
			});
	}
	/** Gets a widget preference. */
	public getPreference(request: IGetPreferenceRequest): Promise<IServiceResult<IGetPreferenceResponse>> {
		const uriPartKey = request.key != null && encodeURIComponent(request.key);
		if (!uriPartKey) {
			return Promise.resolve(createRequiredRequestFieldError('key'));
		}
		const uri = `prefs/${uriPartKey}`;
		const fetchRequest: IFetchRequest = {
			method: 'GET'
		};
		return fetchResponse(this._fetch, this._baseUri + uri, fetchRequest)
			.then(result => {
				const status = result.response.status;
				let value: IGetPreferenceResponse = null;
				if (result.json) {
					if (status === 200 || status === 204) {
						value = { value: result.json };
					}
				}
				if (!value) {
					return createResponseError(status, result.json) as IServiceResult<IGetPreferenceResponse>;
				}
				return { value: value };
			});
	}
	/** Sets a widget preference. */
	public setPreference(request: ISetPreferenceRequest): Promise<IServiceResult<ISetPreferenceResponse>> {
		const uriPartKey = request.key != null && encodeURIComponent(request.key);
		if (!uriPartKey) {
			return Promise.resolve(createRequiredRequestFieldError('key'));
		}
		const uri = `prefs/${uriPartKey}`;
		const fetchRequest: IFetchRequest = {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(request.value)
		};
		return fetchResponse(this._fetch, this._baseUri + uri, fetchRequest)
			.then(result => {
				const status = result.response.status;
				let value: ISetPreferenceResponse = null;
				if (result.json) {
					if (status === 200 || status === 204) {
						value = { value: result.json };
					}
				}
				if (!value) {
					return createResponseError(status, result.json) as IServiceResult<ISetPreferenceResponse>;
				}
				return { value: value };
			});
	}
	/** Gets service info. */
	public getInfo(request: IGetInfoRequest): Promise<IServiceResult<IGetInfoResponse>> {
		const uri = '';
		const fetchRequest: IFetchRequest = {
			method: 'GET'
		};
		return fetchResponse(this._fetch, this._baseUri + uri, fetchRequest)
			.then(result => {
				const status = result.response.status;
				let value: IGetInfoResponse = null;
				if (result.json) {
					if (status === 200 || status === 204) {
						value = result.json;
					}
				}
				if (!value) {
					return createResponseError(status, result.json) as IServiceResult<IGetInfoResponse>;
				}
				return { value: value };
			});
	}
	/** Demonstrates the default HTTP behavior. */
	public notRestful(request: INotRestfulRequest): Promise<IServiceResult<INotRestfulResponse>> {
		const uri = 'notRestful';
		const fetchRequest: IFetchRequest = {
			method: 'POST'
		};
		return fetchResponse(this._fetch, this._baseUri + uri, fetchRequest)
			.then(result => {
				const status = result.response.status;
				let value: INotRestfulResponse = null;
				if (result.json) {
					if (status === 200 || status === 204) {
						value = {};
					}
				}
				if (!value) {
					return createResponseError(status, result.json) as IServiceResult<INotRestfulResponse>;
				}
				return { value: value };
			});
	}
	public kitchen(request: IKitchenRequest): Promise<IServiceResult<IKitchenResponse>> {
		const uri = 'kitchen';
		const fetchRequest: IFetchRequest = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(request)
		};
		return fetchResponse(this._fetch, this._baseUri + uri, fetchRequest)
			.then(result => {
				const status = result.response.status;
				let value: IKitchenResponse = null;
				if (result.json) {
					if (status === 200 || status === 204) {
						value = {};
					}
				}
				if (!value) {
					return createResponseError(status, result.json) as IServiceResult<IKitchenResponse>;
				}
				return { value: value };
			});
	}
	private _fetch: IFetch;
	private _baseUri: string;
}
