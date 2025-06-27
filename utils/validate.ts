

export const isValidEmail = (value: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(value);
}

export const isValidPassword = (value: string): boolean => {
    return value.length >= 8
}