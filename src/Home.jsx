import React from 'react';
import {  View,Text, ActivityIndicator,Dimensions, ScrollView } from 'react-native';
import {  Headline , Subheading} from 'react-native-paper'
import * as Animatable from 'react-native-animatable'
import { Icon } from 'react-native-elements';
import { PieChart, LineChart , Grid} from 'react-native-svg-charts'

const height = Dimensions.get("window").height;

class HomeRoute extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        isloading : true,
        data : [],
        piedata : null,
        height : height,
        err : false
      }
    }
  
    componentDidMount = async (text) =>{
      try {
        const response = await fetch("https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_country.php", {
          "method": "GET",
          "headers": {
            "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
                "x-rapidapi-key": "0b4c5e4f3emsh696a43f0ae1f4b4p17669djsnf41aeb72cc6f"
          }
        });
        const charresponse = await fetch("https://coronavirus-monitor.p.rapidapi.com/coronavirus/world_total_stat.php", {
          "method": "GET",
          "headers": {
            "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
                "x-rapidapi-key": "0b4c5e4f3emsh696a43f0ae1f4b4p17669djsnf41aeb72cc6f"
          }
        });
        
        const responseJson = await response.json();
        const charresponseJson = await charresponse.json()
        this.setState({
          isloading: false,
          data: responseJson['countries_stat'],
          piedata : charresponseJson,
        });
      }
      catch (error) {
        this.setState({
          err : true
        })
        console.log(error);
      }
  
     
    }
  
  
    
    onContentSizeChange = (contentWidth,contentHeight) => {
      this.setState({height : contentHeight});
    };
  
    render(){
      if(this.state.err){
        return(
          <View style = {{flex : 1, justifyContent : 'center' , alignItems : 'center' ,backgroundColor : 'black'}}>
          <Text style = {{color : 'white'}}>Sorry looks like the internet is down or the servers are out!</Text>
          </View>
        )
      }
      if(this.state.isloading){
      return(
        <View style = {{flex : 1, justifyContent : 'center' , alignItems : 'center' ,backgroundColor : 'black'}}>
          <ActivityIndicator color = 'white' size = {50}></ActivityIndicator>
        </View>
      )
      }
      else{
        let value = this.state.data.map((val,key) => {
          return(
            <View key = {key} style = {{flex : 1, justifyContent : 'center' , alignItems : 'center' ,flexDirection : 'row' , marginBottom : 30 }}>
              <Animatable.View animation = "pulse" iterationCount = "infinite" easing = "ease-in-out-circ" style = {{flex : 0.3 , alignItems : 'center' ,justifyContent : 'center'}}>
                <Icon name = "adjust" size = {70} color = 'white'></Icon>
              </Animatable.View>
              <View style = {{flex : 1,flexDirection : 'column' , borderBottomColor : 'white' , borderBottomWidth : 3 , paddingBottom : 15} }>
              <Headline style = {{fontWeight : 'bold',  color : 'white'}}>{val.country_name}</Headline>
              <View style = {{flexDirection : 'column'}}>
              <View style = {{flexDirection : 'row'}}>
              <Subheading style = {{ color : 'white'}}> <Text style = {{fontWeight : 'bold' , color : 'white'}}>Cases :</Text> {val.cases}   </Subheading>
              <Subheading style = {{ color : 'white'}}><Text style = {{fontWeight : 'bold', color: 'white'}}>Deaths :</Text> {val.deaths}</Subheading>
              </View>
              <View style = {{flexDirection : 'row'}}>
              <Subheading style = {{ color : 'white'}}> <Text style = {{fontWeight : 'bold' , color : 'white'}}>Recovered :</Text> {val.total_recovered}   </Subheading>
              <Subheading style = {{ color : 'white'}}><Text style = {{fontWeight : 'bold', color: 'white'}}>Active :</Text> {val.active_cases}</Subheading>
              </View>
              </View>
              </View>
            </View>
  
          )
        });
  
        let v1 =  this.state.piedata['total_recovered']
        
        // v1 = v1.replace(/[^\d\.\-]/g, "");
        // v1 = parseInt(v1)
        // let v2 = this.state.piedata['total_deaths']
        // v2 = v2.replace(/[^\d\.\-]/g, "");
        // v2 = parseInt(v2)
        
        // let v3 =  this.state.piedata['total_cases']
        // v3 = v3.replace(/[^\d\.\-]/g, "");
        // v3 = parseInt(v3)
        
        // v3 -= (v2 + v1)
        
        // const data = [ v3 , v1  , v2]
        // const color = ['#64E8DD' , '#2DFF1F' , 'red']
   
        //   const pieData = data
        //       .map((value, index) => ({
        //           value,
        //           svg: {
        //               fill: color[index],
        //               onPress: () => alert(value),
        //           },
        //           key: `pie-${index}`,
        //       }))
  
  
              
              
        const enable = this.state.height > height
        return(
          <ScrollView  scrollEnabled = {enable} onContentSizeChange = {this.onContentSizeChange} contentContainerStyle = {{flexGrow : 1}} >
            <View style = {{backgroundColor : 'black' , justifyContent : 'center' ,alignItems : 'center'}}>
            <Headline style = {{color : 'white' , marginTop : 40 , marginBottom : 40 , fontWeight : 'bold'}}>COVID-19 WorldWide Stats </Headline>
            </View>
  
            {/* <PieChart data = {pieData} innerRadius = "20%" style = {{height : 250 ,backgroundColor : 'black'}}></PieChart> */}
            <View style = {{flex : 1 ,flexDirection : 'row', backgroundColor : 'black', paddingTop : 20, justifyContent : 'center' ,alignItems : 'center'}}>
              <Icon name = "fiber-manual-record" color = "#64E8DD"></Icon> 
              <Text style = {{color : 'white'}}>Active    </Text>
              <Icon name = "fiber-manual-record" color = "#2DFF1F"></Icon>
              <Text style = {{color : 'white'}}>Recovered   </Text>
              <Icon name = "fiber-manual-record" color = "red"></Icon>
              <Text style = {{color : 'white'}}>Deaths   </Text>
            </View>
            <View style = {{flex : 1, justifyContent : 'center' , alignItems : 'center' , paddingTop : 40 , backgroundColor : 'black'}}>
            {value}
            </View>
          </ScrollView>
        )
      }
  
  }
  }

  export default HomeRoute