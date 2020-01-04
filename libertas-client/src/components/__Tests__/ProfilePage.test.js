import {render} from "react-testing-library"
import "dom-testing-library/extend-expected";

test("page recieves profile and displays name", ()=>{

 const{getBytestId} = render(
     <Name text="Jon Doe"/>

 );

 expect(getBytestId("display-name")).toHaveTextContent(
 "Jon Doe"
 );
}