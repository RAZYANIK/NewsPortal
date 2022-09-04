const newsCategories = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const data = await res.json();
    newsCategoriesQantainer(data.data.news_category)
        .catch((error) => console.log(error));
};