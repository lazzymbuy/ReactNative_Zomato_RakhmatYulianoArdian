import React, { Component } from 'react';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, Footer, Item, Input } from 'native-base';
import { ScrollView, Image}from 'react-native'
import axios from 'axios';

class App extends Component{
  constructor(){
    super();
    this.state = {restoran:[],makanan:''};
  }

  getapi = () => {
    var url = `https://developers.zomato.com/api/v2.1/search?q=${this.state.makanan}`
    
    var config = {
      headers:{'user-key':'cedd139cb75eef4084334750016715ef'}
    };
    axios.get(url, config).then((x)=>{
      this.setState({restoran:x.data.restaurants})
    })
  }

  render(){
    if (this.state.restoran){
        var datafinal = this.state.restoran.map((value,index)=>{
          var nama = value.restaurant.name
          var kota = value.restaurant.location.city
          var alamat = value.restaurant.location.address
          var harga = value.restaurant.average_cost_for_two/2
          var gambar = value.restaurant.thumb
          if (gambar=''){
            gambar='https://adamsbooks.co.za/wp-content/uploads/2018/01/Sorry-Image-Not-Available-260.png'
          }
          return (
            <Card avatar key={index}>
              <CardItem Header>
                <Left>
                  <Thumbnail source={{uri:gambar}}/>
                  <Body>
                    <Text>{nama}</Text>
                    <Text note>{kota}</Text>
                  </Body>
                </Left>
                <Right>
                  <Text>{harga}</Text>
                </Right>
              </CardItem>
              <CardItem>
                <Body>
                  <Image source={{uri:gambar}} style={{height: 200, width: 200, flex: 1}}/>
                </Body>
              </CardItem>
              <CardItem>
                <Left>
                  <Icon
                    name='aperture'
                    color='aquamarine'
                  />
                  <Text>{alamat}</Text>
                </Left>
              </CardItem>
            </Card>
      )
    })
  }
  else {
    var datafinal = <View></View>
    Alert.alert(this.state.makanan+' tidak ada dalam database!')
  }

    return(
    <Container>
      <Header searchBar rounded>
      <Item>
        <Icon name="ios-search" />
        <Input placeholder="Search" />
        <Icon name="ios-people" />
      </Item>
      </Header>
      <Content>
        <Button onPress={this.getapi}
        info block>
        <Text>Cari</Text>
        </Button>
        <ScrollView>
          {datafinal}
        </ScrollView>
      </Content>
      <Footer>
        <FooterTab>
          <Button full>
            <Text>copyright @lazzymbuy</Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
    );
  }
}

export default App;