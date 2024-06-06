import Controller from "sap/ui/core/mvc/Controller";
import BaseController from "./BaseController";
import Event from "sap/ui/base/Event";
import ObjectPageLayout from "sap/uxap/ObjectPageLayout";
import Router from "sap/f/routing/Router";
import JSONModel from "sap/ui/model/json/JSONModel";
import { Route$MatchedEvent } from "sap/ui/core/routing/Route";
import { inputParameters } from "./App.controller";

/**
 * @namespace sap.music.controller
 */
export default class Detail extends BaseController {

	oOwnerComponent: any;
	oRouter: Router;
    oModel: JSONModel
    artist: string

    public onInit(): void {

        this.oOwnerComponent = this.getOwnerComponent();
        this.oRouter = this.oOwnerComponent.getRouter();
        this.oModel = this.oOwnerComponent.getModel("l");

        this.oRouter.getRoute("master").attachPatternMatched((event: Route$MatchedEvent)=> this.onArtistMatched(event),this )
        this.oRouter.getRoute("detail").attachPatternMatched((event: Route$MatchedEvent)=> this.onArtistMatched(event),this )

        
    }
    public onArtistMatched(event: Route$MatchedEvent): void {

        this.artist = (event.getParameter("arguments") as inputParameters).artist || this.artist || "0"
        const path = "/" + this.artist 
        this.getView().bindElement({
            path: path,
        })

    }
    

	public onEditToggleButtonPress(oEvent: Event) {

        const oObjectPage: ObjectPageLayout = this.getView().byId("ObjectPageLayout") as ObjectPageLayout;
        let bCurrentShowFooterState = oObjectPage.getShowFooter();
        oObjectPage.setShowFooter(!bCurrentShowFooterState)
		
	}



}