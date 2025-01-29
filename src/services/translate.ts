import axios from 'axios';

export const translateText = async (text: string, to: string = 'pt') => {
  try {
    const response = await axios.get(
      'https://api.mymemory.translated.net/get',
      {
        params: {
          q: text,
          langpair: `en|${to}`, // Traduz do inglês para o idioma desejado
        },
      }
    );

    if (response.data.responseStatus === 200) {
      return response.data.responseData.translatedText;
    } else {
      throw new Error('Erro na tradução');
    }
  } catch (error) {
    console.error('Erro ao traduzir texto:', error);
    return text; // Retorna o texto original em caso de erro
  }
};