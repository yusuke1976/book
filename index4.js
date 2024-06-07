const btn = document.getElementById("btn");
const formText = document.getElementById("formText");
const bookItemRow = document.querySelector("#bookItem .row");

const funnyDescriptions = [
  "この本は人生を変えるかもしれません...でも、多分ないでしょう。",
  "この本を読めば、知的な人になれると思いますか? 残念ながらそうはならないでしょう。",
  "この本は退屈すぎて眠くなるかもしれません。ご注意ください。",
  "この本は宇宙に関する深い洞察を与えてくれます...でも、実際には全く関係ありません。",
  "この本は人生の意味を教えてくれるかもしれません。でも、誰も聞いていないでしょう。"
];

const createBookCard = (book) => {
  const { imageLinks, title, description, infoLink } = book.volumeInfo;
  const bookImg = imageLinks?.smallThumbnail || '';
  const bookTitle = `${emojiForTitle(title)} ${title || ''}`;
  const bookContent = (description || '').slice(0, 100) + (description?.length > 100 ? '...' : '');
  const bookLink = infoLink || '';

  return `
    <div class="col">
      <div class="card h-100">
        <img src="${bookImg}" class="card-img-top" alt="${bookTitle}" title="${funnyDescriptions[Math.floor(Math.random() * funnyDescriptions.length)]}">
        <div class="card-body">
          <h5 class="card-title"><a href="${bookLink}" target="_blank">${bookTitle}</a></h5>
          <p class="card-text">${bookContent || funnyDescriptions[Math.floor(Math.random() * funnyDescriptions.length)]}</p>
        </div>
      </div>
    </div>
  `;
};

const emojiForTitle = (title) => {
  const titleWords = title.split(' ');
  const emojiMap = {
    'love': '💘',
    'adventure': '🎢',
    'mystery': '🕵️',
    'science': '🔬',
    'horror': '👻',
    'fantasy': '🦄',
    'history': '⌚',
    'romance': '💋',
    'travel': '✈️'
  };

  return titleWords.map(word => emojiMap[word.toLowerCase()] || '').join('');
};

btn.addEventListener('click', async () => {
  const textValue = formText.value.trim();
  if (!textValue) return;

  const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${textValue}`);
  const data = await res.json();

  bookItemRow.innerHTML = '';
  data.items
    ?.filter(({ volumeInfo }) => volumeInfo.imageLinks && volumeInfo.title)
    .forEach(book => {
      const bookCard = createBookCard(book);
      bookItemRow.insertAdjacentHTML('beforeend', bookCard);
    });

  formText.value = '';
});