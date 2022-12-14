import React from 'react';

type HeaderType = {
	'Content-Type'?: string
}
type HttpError = {
	status: number,
	message: string
};
export const useHttp = () => {
	const [loading, setLoading] = React.useState<boolean>(false);
	const [error, setError] = React.useState<HttpError | null>(null);

	const request = React.useCallback(async (url: string, method: string = 'GET', body: any = null, headers: HeaderType = {}) => {
		setLoading(true);
		try {
			if (body) {
				body = JSON.stringify(body);
				headers["Content-Type"] = "application/json";
			}
			const response: any = await fetch(url, {method, body, headers});
			const data = await response.json();
			if (!response.ok) {
				setLoading(false);
				return {
					isOk: response.ok,
					message: data?.message,
					token: data?.token,
					userId: "",
					bio: "",
					email: ""
				}
			}

			setLoading(false);
			return {
				isOk: response.ok,
				message: data?.message,
				token: data.token,
				userId: data.userId,
				bio: data.bio,
				email: data.email
			};
		} catch (e: any) {
			setLoading(false)
			setError(e.message);
			throw e;
		}
	}, []);

	const clearError = React.useCallback(() => setError(null), []);

	return { loading, request, error, clearError };
}