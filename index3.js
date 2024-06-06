const btn = document.getElementById("btn");
const formText = document.getElementById("formText");

btn.addEventListener('click', async() => {
    const textValue = formText.value;
    if (!textValue) return; // 入力がない場合は処理を中断

    const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${textValue}`);
    const data = await res.json();

    const bookItemRow = document.querySelector("#bookItem .row");
    bookItemRow.innerHTML = '';

    for (let i = 0; i < data.items.length; i++) {
        try {
            const bookImg = data.items[i].volumeInfo.imageLinks.smallThumbnail;
            const bookTitle = data.items[i].volumeInfo.title;
            const bookContent = data.items[i].volumeInfo.description;
            const bookLink = data.items[i].volumeInfo.infoLink;

            const bookCard = `
                <div class="col">
                    <div class="card h-100">
                        <img src="${bookImg}" class="card-img-top" alt="${bookTitle}">
                        <div class="card-body">
                            <h5 class="card-title"><a href="${bookLink}" target="_blank">${bookTitle}</a></h5>
                            <p class="card-text">${bookContent}</p>
                        </div>
                    </div>
                </div>
            `;

            bookItemRow.insertAdjacentHTML('beforeend', bookCard);
        } catch (e) {
            continue;
        }
    }

    // 検索後に入力フォームの値をクリアする
    formText.value = '';
});