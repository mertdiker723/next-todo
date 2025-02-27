
export const apiRequest = async (
    url: string,
    data?: Record<string, unknown>,
    method: string = "POST"
) => {
    const options: RequestInit = {
        method,
        headers: {
            "Content-Type": "application/json",
        },
        credentials: 'include',
    };

    if (data) {
        options.body = JSON.stringify(data);
    }

    const res = await fetch(url, options);

    return res;
};
