export const isArcoDark = useDark({ selector: 'body', attribute: 'arco-theme', valueDark: 'dark', valueLight: 'arco-theme' })
export const isUnocssDark = useDark({ selector: 'html', attribute: 'class', valueDark: 'dark', valueLight: '' })
export const arcoToggleDark = useToggle(isArcoDark)
export const unocssToggleDark = useToggle(isUnocssDark)
export const toggleDark = () => {
	arcoToggleDark()
	unocssToggleDark()
}
