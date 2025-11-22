export const createBody = (
  body: Record<string, any> | undefined,
  type: "file" | "json"
): FormData | string | undefined => {
  if (body === undefined) {
    return undefined;
  }

  if (type === "json") {
    return JSON.stringify(body);
  }

  const formData = new FormData();

  Object.entries(body).map(([key, value]) => {
    if (Array.isArray(value)) {
      value.map((file) => {
        formData.append(key, file);
      });
    } else {
      formData.append(key, value);
    }
  });

  return formData;
};
