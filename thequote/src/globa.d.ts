declare module '*.css' {
    const classes: { [key: string]: string };
    export default classes;
}

declare module '*.svg' {
    const content: string;
    export default content;
}

declare module '*.gif' {
    const value: string;
    export default value;
}