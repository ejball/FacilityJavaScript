// DO NOT EDIT: generated by fsdgenjs
/* eslint-disable */
'use strict';

import { HttpClientUtility } from 'facility-core';

/** Provides access to ConformanceApi over HTTP via fetch. */
export function createHttpClient({ fetch, baseUri }) {
  return new ConformanceApiHttpClient(fetch, baseUri);
}

const { fetchResponse, createResponseError, createRequiredRequestFieldError } = HttpClientUtility;

class ConformanceApiHttpClient {
  constructor(fetch, baseUri) {
    if (typeof fetch !== 'function') {
      throw new TypeError('fetch must be a function.');
    }
    if (typeof baseUri === 'undefined') {
      baseUri = '';
    }
    if (/[^\/]$/.test(baseUri)) {
      baseUri += '/';
    }
    this._fetch = fetch;
    this._baseUri = baseUri;
  }

  /** Gets API information. */
  getApiInfo(request) {
    const uri = '';
    const fetchRequest = {
      method: 'GET',
    };
    return fetchResponse(this._fetch, this._baseUri + uri, fetchRequest)
      .then(result => {
        const status = result.response.status;
        let value = null;
        if (result.json) {
          if (status === 200) {
            value = result.json;
          }
        }
        if (!value) {
          return createResponseError(status, result.json);
        }
        return { value: value };
      });
  }

  /** Gets widgets. */
  getWidgets(request) {
    let uri = 'widgets';
    const query = [];
    request.query == null || query.push('q=' + encodeURIComponent(request.query));
    if (query.length) {
      uri = uri + '?' + query.join('&');
    }
    const fetchRequest = {
      method: 'GET',
    };
    return fetchResponse(this._fetch, this._baseUri + uri, fetchRequest)
      .then(result => {
        const status = result.response.status;
        let value = null;
        if (result.json) {
          if (status === 200) {
            value = result.json;
          }
        }
        if (!value) {
          return createResponseError(status, result.json);
        }
        return { value: value };
      });
  }

  /** Creates a new widget. */
  createWidget(request) {
    const uri = 'widgets';
    const fetchRequest = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request.widget)
    };
    return fetchResponse(this._fetch, this._baseUri + uri, fetchRequest)
      .then(result => {
        const status = result.response.status;
        let value = null;
        if (result.json) {
          if (status === 201) {
            value = { widget: result.json };
          }
        }
        if (!value) {
          return createResponseError(status, result.json);
        }
        let headerValue;
        headerValue = result.response.headers.get('Location');
        if (headerValue != null) {
          value.url = headerValue;
        }
        headerValue = result.response.headers.get('eTag');
        if (headerValue != null) {
          value.eTag = headerValue;
        }
        return { value: value };
      });
  }

  /** Gets the specified widget. */
  getWidget(request) {
    const uriPartId = request.id != null && request.id.toString();
    if (!uriPartId) {
      return Promise.resolve(createRequiredRequestFieldError('id'));
    }
    const uri = `widgets/${uriPartId}`;
    const fetchRequest = {
      method: 'GET',
      headers: {},
    };
    if (request.ifNotETag != null) {
      fetchRequest.headers['If-None-Match'] = request.ifNotETag;
    }
    return fetchResponse(this._fetch, this._baseUri + uri, fetchRequest)
      .then(result => {
        const status = result.response.status;
        let value = null;
        if (result.json) {
          if (status === 200) {
            value = { widget: result.json };
          }
          else if (status === 304) {
            value = { notModified: true };
          }
        }
        if (!value) {
          return createResponseError(status, result.json);
        }
        let headerValue;
        headerValue = result.response.headers.get('eTag');
        if (headerValue != null) {
          value.eTag = headerValue;
        }
        return { value: value };
      });
  }

  /** Deletes the specified widget. */
  deleteWidget(request) {
    const uriPartId = request.id != null && request.id.toString();
    if (!uriPartId) {
      return Promise.resolve(createRequiredRequestFieldError('id'));
    }
    const uri = `widgets/${uriPartId}`;
    const fetchRequest = {
      method: 'DELETE',
      headers: {},
    };
    if (request.ifETag != null) {
      fetchRequest.headers['If-Match'] = request.ifETag;
    }
    return fetchResponse(this._fetch, this._baseUri + uri, fetchRequest)
      .then(result => {
        const status = result.response.status;
        let value = null;
        if (result.json) {
          if (status === 204) {
            value = {};
          }
          else if (status === 404) {
            value = { notFound: true };
          }
          else if (status === 409) {
            value = { conflict: true };
          }
        }
        if (!value) {
          return createResponseError(status, result.json);
        }
        return { value: value };
      });
  }

  /** Gets the specified widgets. */
  getWidgetBatch(request) {
    const uri = 'widgets/get';
    const fetchRequest = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request.ids)
    };
    return fetchResponse(this._fetch, this._baseUri + uri, fetchRequest)
      .then(result => {
        const status = result.response.status;
        let value = null;
        if (result.json) {
          if (status === 200) {
            value = { results: result.json };
          }
        }
        if (!value) {
          return createResponseError(status, result.json);
        }
        return { value: value };
      });
  }

  mirrorFields(request) {
    const uri = 'mirrorFields';
    const fetchRequest = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request)
    };
    return fetchResponse(this._fetch, this._baseUri + uri, fetchRequest)
      .then(result => {
        const status = result.response.status;
        let value = null;
        if (result.json) {
          if (status === 200) {
            value = result.json;
          }
        }
        if (!value) {
          return createResponseError(status, result.json);
        }
        return { value: value };
      });
  }

  checkQuery(request) {
    let uri = 'checkQuery';
    const query = [];
    request.string == null || query.push('string=' + encodeURIComponent(request.string));
    request.boolean == null || query.push('boolean=' + request.boolean.toString());
    request.double == null || query.push('double=' + encodeURIComponent(request.double.toString()));
    request.int32 == null || query.push('int32=' + request.int32.toString());
    request.int64 == null || query.push('int64=' + request.int64.toString());
    request.decimal == null || query.push('decimal=' + request.decimal.toString());
    request.enum == null || query.push('enum=' + request.enum);
    if (query.length) {
      uri = uri + '?' + query.join('&');
    }
    const fetchRequest = {
      method: 'GET',
    };
    return fetchResponse(this._fetch, this._baseUri + uri, fetchRequest)
      .then(result => {
        const status = result.response.status;
        let value = null;
        if (result.json) {
          if (status === 200) {
            value = {};
          }
        }
        if (!value) {
          return createResponseError(status, result.json);
        }
        return { value: value };
      });
  }

  checkPath(request) {
    const uriPartString = request.string != null && encodeURIComponent(request.string);
    if (!uriPartString) {
      return Promise.resolve(createRequiredRequestFieldError('string'));
    }
    const uriPartBoolean = request.boolean != null && request.boolean.toString();
    if (!uriPartBoolean) {
      return Promise.resolve(createRequiredRequestFieldError('boolean'));
    }
    const uriPartDouble = request.double != null && encodeURIComponent(request.double.toString());
    if (!uriPartDouble) {
      return Promise.resolve(createRequiredRequestFieldError('double'));
    }
    const uriPartInt32 = request.int32 != null && request.int32.toString();
    if (!uriPartInt32) {
      return Promise.resolve(createRequiredRequestFieldError('int32'));
    }
    const uriPartInt64 = request.int64 != null && request.int64.toString();
    if (!uriPartInt64) {
      return Promise.resolve(createRequiredRequestFieldError('int64'));
    }
    const uriPartDecimal = request.decimal != null && request.decimal.toString();
    if (!uriPartDecimal) {
      return Promise.resolve(createRequiredRequestFieldError('decimal'));
    }
    const uriPartEnum = request.enum != null && request.enum;
    if (!uriPartEnum) {
      return Promise.resolve(createRequiredRequestFieldError('enum'));
    }
    const uri = `mirror/${uriPartString}/${uriPartBoolean}/${uriPartDouble}/${uriPartInt32}/${uriPartInt64}/${uriPartDecimal}/${uriPartEnum}`;
    const fetchRequest = {
      method: 'GET',
    };
    return fetchResponse(this._fetch, this._baseUri + uri, fetchRequest)
      .then(result => {
        const status = result.response.status;
        let value = null;
        if (result.json) {
          if (status === 200) {
            value = {};
          }
        }
        if (!value) {
          return createResponseError(status, result.json);
        }
        return { value: value };
      });
  }

  mirrorHeaders(request) {
    const uri = 'mirrorHeaders';
    const fetchRequest = {
      method: 'GET',
      headers: {},
    };
    if (request.string != null) {
      fetchRequest.headers['string'] = request.string;
    }
    if (request.boolean != null) {
      fetchRequest.headers['boolean'] = request.boolean;
    }
    if (request.double != null) {
      fetchRequest.headers['double'] = request.double;
    }
    if (request.int32 != null) {
      fetchRequest.headers['int32'] = request.int32;
    }
    if (request.int64 != null) {
      fetchRequest.headers['int64'] = request.int64;
    }
    if (request.decimal != null) {
      fetchRequest.headers['decimal'] = request.decimal;
    }
    if (request.enum != null) {
      fetchRequest.headers['enum'] = request.enum;
    }
    return fetchResponse(this._fetch, this._baseUri + uri, fetchRequest)
      .then(result => {
        const status = result.response.status;
        let value = null;
        if (result.json) {
          if (status === 200) {
            value = {};
          }
        }
        if (!value) {
          return createResponseError(status, result.json);
        }
        let headerValue;
        headerValue = result.response.headers.get('string');
        if (headerValue != null) {
          value.string = headerValue;
        }
        headerValue = result.response.headers.get('boolean');
        if (headerValue != null) {
          value.boolean = headerValue;
        }
        headerValue = result.response.headers.get('double');
        if (headerValue != null) {
          value.double = headerValue;
        }
        headerValue = result.response.headers.get('int32');
        if (headerValue != null) {
          value.int32 = headerValue;
        }
        headerValue = result.response.headers.get('int64');
        if (headerValue != null) {
          value.int64 = headerValue;
        }
        headerValue = result.response.headers.get('decimal');
        if (headerValue != null) {
          value.decimal = headerValue;
        }
        headerValue = result.response.headers.get('enum');
        if (headerValue != null) {
          value.enum = headerValue;
        }
        return { value: value };
      });
  }

  mixed(request) {
    const uriPartPath = request.path != null && encodeURIComponent(request.path);
    if (!uriPartPath) {
      return Promise.resolve(createRequiredRequestFieldError('path'));
    }
    let uri = `mixed/${uriPartPath}`;
    const query = [];
    request.query == null || query.push('query=' + encodeURIComponent(request.query));
    if (query.length) {
      uri = uri + '?' + query.join('&');
    }
    const fetchRequest = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        normal: request.normal
      })
    };
    if (request.header != null) {
      fetchRequest.headers['header'] = request.header;
    }
    return fetchResponse(this._fetch, this._baseUri + uri, fetchRequest)
      .then(result => {
        const status = result.response.status;
        let value = null;
        if (result.json) {
          if (status === 200) {
            value = result.json;
          }
          else if (status === 202) {
            value = { body: result.json };
          }
          else if (status === 204) {
            value = { empty: true };
          }
        }
        if (!value) {
          return createResponseError(status, result.json);
        }
        let headerValue;
        headerValue = result.response.headers.get('header');
        if (headerValue != null) {
          value.header = headerValue;
        }
        return { value: value };
      });
  }

  required(request) {
    let uri = 'required';
    const query = [];
    request.query == null || query.push('query=' + encodeURIComponent(request.query));
    if (query.length) {
      uri = uri + '?' + query.join('&');
    }
    const fetchRequest = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        normal: request.normal,
        widget: request.widget,
        widgets: request.widgets,
        widgetMatrix: request.widgetMatrix,
        widgetResult: request.widgetResult,
        widgetResults: request.widgetResults,
        widgetMap: request.widgetMap,
        hasWidget: request.hasWidget
      })
    };
    return fetchResponse(this._fetch, this._baseUri + uri, fetchRequest)
      .then(result => {
        const status = result.response.status;
        let value = null;
        if (result.json) {
          if (status === 200) {
            value = result.json;
          }
        }
        if (!value) {
          return createResponseError(status, result.json);
        }
        return { value: value };
      });
  }
}