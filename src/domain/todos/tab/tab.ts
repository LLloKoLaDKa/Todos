export default class Tab {
	constructor(
		public title: string,
		public onChangeCallback: () => void
	) { }
}