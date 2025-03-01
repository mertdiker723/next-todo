
export const apiRequest = async (
    url: string,
    method: string = "POST",
    data?: Record<string, unknown>
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
