import BaseController from "./BaseController";
import Router from "sap/f/routing/Router";
import { Router$RouteMatchedEvent } from "sap/ui/core/routing/Router";
import FlexibleColumnLayout, { FlexibleColumnLayout$StateChangeEvent } from "sap/f/FlexibleColumnLayout";
import { layout } from "sap/ui/commons/library";


export type inputParameters = {
	artist: string;
};

/**
 * @namespace sap.music.controller
 */
export default class App extends BaseController {

	private currentRouteName: string;
	private currentArtist: string;


	public onInit(): void {

		this.getOwnerComponent().getRouter().attachRouteMatched((event: Router$RouteMatchedEvent)=> this.onRouteMatched(event),this);
	}
	public onRouteMatched(event: Router$RouteMatchedEvent): void {

		const sRouteName = event.getParameter("name"),
		oArguments = (event.getParameter("arguments") as inputParameters);

		this.currentRouteName = sRouteName;

		this.currentArtist = oArguments.artist;

	}


	
	public onStateChange(oEvent: FlexibleColumnLayout$StateChangeEvent) :void {

		const isNavArrow = oEvent.getParameter("isNavigationArrow"),
		sLayout = oEvent.getParameter("layout");

		if(isNavArrow) {
			this.getOwnerComponent().getRouter().navTo(this.currentRouteName, {layout: sLayout, artist: this.currentArtist},{},true)
		}

		
	}
	onExit(): void {
		this.getRouter() && this.getRouter().detachRouteMatched((event: Router$RouteMatchedEvent)=>this.onRouteMatched(event), this);
	}
}
