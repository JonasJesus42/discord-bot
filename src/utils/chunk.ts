export function chunk<T>(items: T[], chunk: number): T[][] {
  const chunked: T[][] = [];

  for (let i = 0; i < items.length; i += chunk) {
    chunked.push(items.slice(i, i + chunk));
  }

  return chunked;
}
