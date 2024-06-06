import BaseController from "./BaseController";
import Event from "sap/ui/base/Event";
import Filter from "sap/ui/model/Filter";
import FilterOperator from "sap/ui/model/FilterOperator";
import Binding from "sap/ui/model/Binding";
import MessageBox from "sap/m/MessageBox";
import Sorter from "sap/ui/model/Sorter";
import View from "sap/ui/core/mvc/View";
import FlexibleColumnLayout from "sap/f/FlexibleColumnLayout";
import { LayoutType } from "sap/f/library";
import Router from "sap/f/routing/Router";
import { CustomListItem$DetailClickEvent } from "sap/ui/webc/main/CustomListItem";
import { layout } from "sap/ui/commons/library";
import { SearchField$SearchEvent } from "sap/m/SearchField";

/**
 * @namespace sap.music.controller
 */
export default class List extends BaseController {
	oView: View;
	bDescSort: boolean;
	oProductsTable: any;

	oOwnerComponent: any;
	oRouter: Router;




	onInit(): void {

		 this.oView  = this.getView();
		 this.bDescSort = false;
		 this.oProductsTable = this.oView.byId("idTable")
		 
	}

	public onSearch(oEvent: SearchField$SearchEvent): void {
		let oTableSearchState: Filter[] = [],
		 sQuery = oEvent.getParameter("query");

		 if (sQuery && sQuery.length >0) {
			oTableSearchState = [new Filter("artist", FilterOperator.Contains, sQuery)]
		 }

		 this.oProductsTable.getBinding('items').filter(oTableSearchState, "Application")
		 

	}

	public onAdd() {
		MessageBox.information("This functionality is not ready yet.")

	}

	public onSort() {
		this.bDescSort = !this.bDescSort;
		let oBinding = this.oProductsTable.getBinding("items"), oSorter = new Sorter("artist",this.bDescSort)

		oBinding.sort(oSorter)

	}
	onListItemPress(oEvent: CustomListItem$DetailClickEvent) {

		// const oFCL: FlexibleColumnLayout = this.oView.getParent().getParent() as FlexibleColumnLayout;

		// oFCL.setLayout(LayoutType.TwoColumnsMidExpanded)
		
		let artistPath = oEvent.getSource().getBindingContext().getPath();
		let artist = artistPath.split('/').slice(-1).pop(); 

		this.getRouter().navTo("detail", {layout: LayoutType.TwoColumnsMidExpanded, artist: artist},{},true)
		
		
	}


	
}
