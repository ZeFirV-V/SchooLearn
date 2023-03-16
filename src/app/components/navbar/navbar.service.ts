export interface INavigation {
  id: number;
  title: string;
  path: string;
}

export const navigation: INavigation[] = [
  { id: 1, title: "О нас", path: "/about"},
  { id: 2, title: "Соревнования", path: "/tasks"},
  { id: 3, title: "Рейтинг", path: "/rating"},
  { id: 4, title: "Вопросы", path: "/FAQ"},
]
