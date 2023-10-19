export const search = (name) => {
    cy.get(".sc-iIUQWv").clear().type(name, {delay: 70});
    cy.get(".gaXnty").click({delay: 100});
}
export const productCards = () => {
    return cy.get('div[data-e2e="product-card"]')
}