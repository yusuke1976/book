const btn = document.getElementById("btn");

btn.addEventListener('click', async() => {
    // フォームに入力されたテキストの取得
    const textValue = document.getElementById("formText").value;
    // 書籍検索ができるGoogle Books APIのエンドポイントにフォームから取得したテキストを埋め込む
    const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${textValue}`);
    const data = await res.json();
    const bookItem = document.getElementById("bookItem");
    for(let i = 0; i < data.items.length; i++){
        // 例外が起きなければtryブロック内のコードが実行される
        try{
            // JSONデータの取得
            // 画像を表示するリンク
            const bookImg = data.items[i].volumeInfo.imageLinks.smallThumbnail;
            // 本のタイトル
            const bookTitle = data.items[i].volumeInfo.title;
            // 本の説明文
            const bookContent = data.items[i].volumeInfo.description;
            // 各書籍のGoogle Booksへのリンク
            const bookLink = data.items[i].volumeInfo.infoLink;
            // 取得したデータを入れるための要素を作成
            const makeElement = document.createElement("div");
            // 要素別に識別できるようにidに数字を埋め込む
            makeElement.setAttribute("id", `bookItem${i}`);
            // 取得した要素に作成した要素を挿入
            bookItem.appendChild(makeElement);
            // 作成した要素を習得
            const getBookItem = document.getElementById(`bookItem${i}`);
            // APIで取得したデータの分だけHTML要素を作成し、取得した要素にを埋め込む
            const setBookElement = `
                <div class="container">
                    <div class="col">
                        <div class="card shadow-sm">
                            <div class="card-body">
                                <img src="${bookImg}"><br>
                                <a id="link${i}" class="card-text" target="_blank">${bookTitle}</a>
                                <div class="d-flex justify-content-between align-items-center">
                                    <p>${bookContent}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            // APIから取得した、実際のGoogle Booksのサイトに飛ばすためのリンクを埋め込む
            getBookItem.innerHTML = setBookElement;
            const link = document.getElementById(`link${i}`);
            link.href = bookLink;
            // 途中で例外が発生した場合はcatchブロック内のコードが実行される
        }catch(e){
            continue;
        };
    };
});
