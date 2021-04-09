export type Opaque<K, T> = T & { __TYPE__: K };

export type HtmlElementProps<T> = React.DetailedHTMLProps<React.HTMLAttributes<T>, T>;
