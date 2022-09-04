const newsCategories = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const data = await res.json();
    newsCategoriesQantainer(data.data.news_category)
        .catch((error) => console.log(error));
};
const newsCategoriesQantainer = (types) => {
    console.log(types);
    const categoriesContainer = document.getElementById("newsCatagory");

    types.forEach((category) => {

        const newsItem = document.createElement("p");
        newsItem.innerHTML = `
        <p style="cursor: context-menu" class="text-white text-center fw-semibold " href="" onclick="loadNews(${category.category_id})">
            ${category.category_name}
        </p>
        `;
        categoriesContainer.appendChild(newsItem);
    });

};
const loadNews = (newsId) => {
    const url = `https://openapi.programming-hero.com/api/news/category/0${newsId}`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => newsPortal(data.data));
    spinner(true);

};
const newsPortal = (newsPor) => {
    const newsContainer = document.getElementById("displayNews");
    newsContainer.innerText = ``;
    const newsSorting = newsPor.sort((x, y) => {
        return y.total_view - x.total_view
    })
    newsSorting.forEach((news) => {
        console.log(news);
        const newsItem = document.createElement("div");
        newsItem.classList.add("card");
        newsItem.classList.add("m-3");
        newsItem.classList.add("bg-warning");
        newsItem.classList.add("rounded-1");
        newsItem.innerHTML = `
            <div class="row g-5">
                <div class="col-md-4 col-sm-12 col-12">
                    <img src="${news.thumbnail_url}" class="img-fluid p-3 rounded-3" alt="..." style="height: 500px; width: 500px;">
                </div>
                <div class="col-md-8 col-sm-12 col-12">
                    <div class="card-body">
                        <h5 class="card-title fw-bolder mt-lg-5 mt-md-5 mt-sm-0 mt-0 mb-5">
                            ${news.title}
                        </h5>
                        <p class="card-text text-black-50 fw-semibold pe-3 pb-lg-5 mb-lg-5 mb-md-5 mb-sm-5 mb-5 pb-md-5 pb-sm-0 pb-0 me-3">
                            ${news.details.slice(0, 500).concat('...')}
                        </p>
                        <div class="d-flex align-items-center justify-content-between me-lg-4 me-md-4 me-sm-0 me-0 flex-lg-row flex-md-row flex-sm-column flex-column">
                            <div class="d-flex justify-content-center gap-4 mt-1">
                                <img src="${news.author.img ? news.author.img : 'No Image Found'}" alt="" class="img-fluid rounded rounded-circle" style="width: 45px; height: 45px;">
                                <div>
                                    <h6 class="fw-bold">${news.author.name ? news.author.name : 'No Name Found'}</h6>
                                    <p class="fw-bold text-white">${news.author.published_date.split(' ').shift()}</p>
                                </div>
                            </div>
                            <div class="d-flex fw-bold gap-2">
                                <p>
                                    <i class="bi bi-eye"></i>
                                </p>
                                <p><span>${news.total_view
            }</span> views</p>
                            </div>
                            <div>
                                <button class="btn btn-dark border border-0 me-3" onclick="loadNewsDetails('${news._id}')" data-bs-toggle="modal" data-bs-target="#newsDetailModal">
                                    View News
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        console.log(news._id);
        newsContainer.appendChild(newsItem);
        spinner(false);
    });
    const numberOfItems = newsPor.length;
    console.log(numberOfItems);
    displayNumberOfItems(numberOfItems);
};
const spinner = (isLoading) => {
    const loaderSection = document.getElementById('Buffering');
    if (isLoading) {
        loaderSection.classList.remove('d-none');
    }
    else {
        loaderSection.classList.add('d-none');
    }
}
const loadNewsDetails = async news_id => {
    const url = `https://openapi.programming-hero.com/api/news/${news_id}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayNewsDetails(data.data[0]);
    }
    catch (error) {
        console.log(error);
    }
}