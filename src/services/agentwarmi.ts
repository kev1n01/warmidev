export const agentWarmi = async (urlapi: string, message: string) => {
  const response =  await fetch(urlapi + "bot/query/warmibot", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ query: message }),
  });
    
  return await response.json();
  // const reader = response.body?.getReader();
  // const decoder = new TextDecoder();

  // return {
  //     stream: reader,
  //     decoder: decoder
  // };
}