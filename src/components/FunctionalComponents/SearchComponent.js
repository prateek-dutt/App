import { setSelectionRange } from "@testing-library/user-event/dist/utils";
import React from "react";

class SearchComponent {

    res_arr;

    SearchComponent(key,target,setAllDrug,allProducts){
        
        this.key=key;
        this.target=target;
        this.setAllDrug=setAllDrug;
        this.allProducts=allProducts;
       // this.loadSearcher();
    }

    searchDrug(key)
    {

       // key === 'All' ? setAllDrug(allProducts) : setAllDrug(allProducts.filter(drug => drug['name'] === filterValue));
       
       this.res_arr=this.setAllDrug;

    }

    loadSeacher() {

        switch(this.target)
        {
            case 'drugs':this.searchDrug(this.key);
        }

        
    }

}
export default SearchComponent;