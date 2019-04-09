interface Controller {
	path: string;
	router: any;

	intializeRoutes(): void;
}