import { createSelector } from 'reselect'

export const categoriesComboboxSelector = createSelector(
    [state => state.aboutUs],
    aboutUs => aboutUs.categoriesCombobox
)

export const listNewsStackSelector = createSelector(
    [state => state.aboutUs],
    aboutUs => aboutUs.listNewsStack
)