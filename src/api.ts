//const API_URL="https://localhost:7221"
const API_URL=""

export interface NewCustomerResponse {
    id: number;
    stripeCustomerId: string;
}

export interface GetEphemeralKeyRequest {
    stripeCustomerId: string;
}

export interface GetEphemeralKeyResponse {
    id: string;
    secret: string;
    expires: Date;
}
    //public record CreateSetupIntentRequest(string stripeCustomerId);
    //public record CreateSetupIntentResponse(int id, string stripeSetupIntentId, string stripeClientSecret); 

export interface CreateSetupIntentRequest {
    stripeCustomerId: string;
}

export interface CreateSetupIntentResponse {
    id: number;
    stripeSetupIntentId: string;
    stripeClientSecret: string;
}

export interface Response<T> {
    response: T | null;
    status: number;
    error: string;
    message: string;
}

export async function callPostData<T>(url: string, data: string): Promise<Response<T>> {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: data
    });
    if (!response.ok) {
        console.error(`http post failed: ${url}, status ${response.status}`);
        let responseAny = await response.json(); 
        return {
            response: null,
            status: response.status,
            error: responseAny.error || '',
            message: responseAny.message || '', 
        }
    }
    let responseT: T = await response.json() as T;
    return {
        response: responseT,
        status: response.status,
        error: '',
        message: '', 
    }
}

export async function callGetData<T>(url: string): Promise<Response<T>> {
    const response = await fetch(url, {
        method: 'GET',
    });
    if (!response.ok) {
        console.error(`http get failed: ${url}, status ${response.status}`);
        let responseAny = await response.json(); 
        return {
            response: null,
            status: response.status,
            error: responseAny.error || '',
            message: responseAny.message || '', 
        }
    }
    let responseT: T = await response.json() as T;
    return {
        response: responseT,
        status: response.status,
        error: '',
        message: '', 
    }
}

export async function callGetCustomer(): Promise<Response<NewCustomerResponse>> {
    let response = await callGetData<NewCustomerResponse>(`${API_URL}/api1/stripe-test/get-customer`);
    return response;
}

export async function callGetEphemeralKey(request: GetEphemeralKeyRequest): Promise<Response<GetEphemeralKeyResponse>> {
    let data: string = JSON.stringify(request);
    let response = await callPostData<GetEphemeralKeyResponse>(`${API_URL}/api1/stripe-test/get-ephemeral-key`, data);
    return response;
}

export async function callCreateSetupIntent(request: CreateSetupIntentRequest): Promise<Response<CreateSetupIntentResponse>> {
    let data: string = JSON.stringify(request);
    let response = await callPostData<CreateSetupIntentResponse>(`${API_URL}/api1/stripe-test/create-setup-intent`, data);
    return response;
}

