import UIComponent from "sap/ui/core/UIComponent";
import models from "./model/models";
import Device from "sap/ui/Device";
import JSONModel from "sap/ui/model/json/JSONModel";
import { Router$BeforeRouteMatchedEvent } from "sap/ui/core/routing/Router";
import { LayoutType } from "sap/f/library";

type routeParameters = {
	arguments: {
		layout: string;
	}
};
/**
 * @namespace sap.music
 */
export default class Component extends UIComponent {
	public static metadata = {
		manifest: "json",
	};


	public init(): void {
		// call the base component's init function
		super.init();


		this.setModel(new JSONModel, "l")

		var oBaseModel = new JSONModel('/model/music_dataset.json')
		this.setModel(oBaseModel)

		this.getRouter().attachBeforeRouteMatched((event: Router$BeforeRouteMatchedEvent) => void this.onBeforeRouteMatched(event), this);


		// create the views based on the url/hash
		this.getRouter().initialize()
	}

	public destroy(): void {
		this.getRouter().detachBeforeRouteMatched((event: Router$BeforeRouteMatchedEvent) => void this.onBeforeRouteMatched(event), this);
		super.destroy();
	}
	private async onBeforeRouteMatched(event: Router$BeforeRouteMatchedEvent) {

		const oModel: JSONModel = this.getModel("l") as JSONModel;
		let sLayout = (event.getParameters() as routeParameters).arguments.layout;

		if (!sLayout) {
			sLayout = LayoutType.OneColumn
		}

		oModel.setProperty("/layout",sLayout)


	}

}
