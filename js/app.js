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