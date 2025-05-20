export const agentWarmi = async (urlapi: string, data: any) => {
  const response =  await fetch(urlapi + "bot/query/warmibot", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data),
  });
    
  const reader = response.body?.getReader();
  const decoder = new TextDecoder();

  return {
      stream: reader,
      decoder: decoder
  };
}