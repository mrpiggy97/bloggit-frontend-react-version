export let emptyResultsPage = {
    results : [],
    nextPage : null,
    previousPage : null,
    authenticated : localStorage.getItem("bloggit_token") ? true : false
}