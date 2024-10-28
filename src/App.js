import React, { useState, useEffect } from 'react';
import { Form, Checkbox, Button, Header, Grid, Input, Image, List, TextArea } from 'semantic-ui-react';
import _ from "lodash"
import './App.css'; // Import custom CSS

const CateringForm = () => {
  const [baseItems, setBaseItems] = useState({});
  const [additionalItems, setAdditionalItems] = useState({});
  const [numPeople, setNumPeople] = useState(20); // Default number of people
  const [totalPrice, setTotalPrice] = useState(0);
  const [additionalInfo, setAdditionalInfo] = useState("");
  const STARTER_ITEM_LIMIT = 5;
  const ADDITIONAL_ITEM_PRICE = 3;

  // Pricing model
  const packagePricing = {
    starters: { '20-49': 21, '50-99': 19, '100+': 17 }
  };

  // const additionalItemPricing = {
  //   appetizers: ADDITIONAL_ITEM_PRICE,
  //   pasta: ADDITIONAL_ITEM_PRICE,
  //   sandwiches: ADDITIONAL_ITEM_PRICE,
  //   meat: ADDITIONAL_ITEM_PRICE,
  //   seafood: ADDITIONAL_ITEM_PRICE,
  //   salad: ADDITIONAL_ITEM_PRICE,
  //   sides: ADDITIONAL_ITEM_PRICE,
  //   desserts: ADDITIONAL_ITEM_PRICE
  // };

  const categories = [
    {
      name: 'Appetizer',
      key: 'appetizers',
      items: [
        { name: 'Shrimp Cocktail', premium: '**' },
        { name: 'Meatballs' },
        { name: 'Stuffed Mushroom' },
        { name: 'Crab Cakes' },
        { name: 'Coconut Shrimp', premium: '**' },
        { name: 'Salsa & Chips' },
        { name: 'Charcuterie Board', premium: '***' },
        { name: 'Veggie Platter' },
        { name: 'Fruit Platter' },
        { name: 'Hot Crab Dip' },
        { name: 'Hot Spinach & Artichoke Dip' },
        { name: 'Chicken Wings' },
        { name: 'Fried Plantains' },
        { name: 'Fried Sweet Plantains' }
      ]
    },
    {
      name: 'Pasta',
      key: 'pasta',
      items: [
        { name: 'Eggplant Parmigiana Pasta' },
        { name: 'Chicken Parmigiana Pasta' },
        { name: 'Meatballs Pasta' },
        { name: 'Chicken Parm Pasta' },
        { name: 'Chicken Broccoli & Ziti Pasta' },
        { name: 'Vegetable Lasagna' },
        { name: 'Meat Lasagna' },
        { name: 'Stuffed Shells Pasta' },
        { name: 'Sausage Pepper & Onions Pasta' },
        { name: 'Baked Macaroni & Cheese' },
        { name: 'Veggie Pasta' }
      ]
    },
    {
      name: 'Sandwich And Wrap',
      key: 'sandwiches',
      items: [
        { name: 'Mixed Tray Of Different Sandwiches' },
        { name: 'Pulled Pork Sandwich' },
        { name: 'BLT Sandwich' },
        { name: 'Tuna Melt Sandwich' }
      ]
    },
    {
      name: 'Meat',
      key: 'meat',
      items: [
        { name: 'Jerk Chicken' },
        { name: 'Curry Chicken' },
        { name: 'Chicken Stew' },
        { name: 'Grilled Chicken' },
        { name: 'Fried Chicken' },
        { name: 'Chicken Skewers' },
        { name: 'Pulled Pork' },
        { name: 'Grilled Pork' },
        { name: 'Fried Pork' },
        { name: 'Pork Skewers' },
        { name: 'Roasted Pork' },
        { name: 'Beef Stew' },
        { name: 'Grilled Beef' },
        { name: 'Beef Skewers' },
        { name: 'Fried Goat' },
        { name: 'Curry Goat' },
        { name: 'Goat Stew' },
        { name: 'Grilled Goat' },
        { name: 'Grilled Lamb' },
        { name: 'Lamb Stew' }
      ]
    },
    {
      name: 'Seafood',
      key: 'seafood',
      items: [
        { name: 'Salmon Jerk', premium: '**' },
        { name: 'Salmon Honey Glazed', premium: '**' },
        { name: 'Grilled Salmon', premium: '**' },
        { name: 'Salmon Bites', premium: '**' },
        { name: 'Grilled Shrimp', premium: '**' },
        { name: 'Fried Shrimp', premium: '**' },
        { name: 'Shrimp Skewers', premium: '**' },
        { name: 'Shrimp Stew', premium: '**' },
        { name: 'Shrimp Creole', premium: '**' },
        { name: 'Grilled Cod', premium: '**' },
        { name: 'Cod Stew', premium: '**' },
        { name: 'Grilled Red Snapper', premium: '**' },
        { name: 'Fried Red Snapper', premium: '**' },
        { name: 'Red Snapper Stew', premium: '**' },
        { name: 'Conch Stew', premium: '**' },
        { name: 'Clam Baked', premium: '**' }
      ]
    },
    {
      name: 'Salad',
      key: 'salad',
      items: [
        { name: 'Caesar Salad' },
        { name: 'Greek Salad' },
        { name: 'Fruit Salad' },
        { name: 'Cobb Salad' },
        { name: 'Southwest' },
        { name: 'Pasta Salad' },
        { name: 'Potato Salad' }
      ]
    },
    {
      name: 'Sides',
      key: 'sides',
      items: [
        { name: 'White Rice' },
        { name: 'Veggie Rice' },
        { name: 'Plantains' },
        { name: 'Mashed Potatoes' },
        { name: 'Baked Potato' },
        { name: 'Steamed Veggies' },
        { name: 'Sauteed Veggies' },
        { name: 'Corn On The Cob' },
        { name: 'Rice and Red Beans' },
        { name: 'Rice and Lima Beans' },
        { name: 'Roasted Parm Potatoes' }
      ]
    },
    {
      name: 'Dessert',
      key: 'desserts',
      items: [
        { name: 'Cookies', premium: '*' },
        { name: 'Brownies', premium: '*' },
        { name: 'Carrot Cake', premium: '*' },
        { name: 'Chocolate Cake', premium: '*' },
        { name: 'Cupcakes', premium: '*' },
        { name: 'Vanilla Bean Cheesecake', premium: '*' }
      ]
    }
  ];  

  // Determine the pricing tier based on the number of people
  const getPricingTier = () => {
    if (numPeople >= 15 && numPeople <= 49) return '20-49';
    if (numPeople >= 50 && numPeople <= 99) return '50-99';
    return '100+';
  };


  useEffect(() => {
    // Calculate the total price based on the selected items and package
    const calculateTotalPrice = () => {
      let basePrice = 0;
      const pricingTier = getPricingTier();

      const selectedBaseItemsCount = countSelectedBaseItems();
      if (selectedBaseItemsCount > 0) {
        basePrice = packagePricing['starters'][pricingTier] * numPeople;
      }

      // Additional item prices for items beyond the package limit
      let additionalPrice = 0;
      if (selectedBaseItemsCount > STARTER_ITEM_LIMIT) {
        const additionalItemsCount = selectedBaseItemsCount - STARTER_ITEM_LIMIT;
        additionalPrice += additionalItemsCount * ADDITIONAL_ITEM_PRICE * numPeople;
      }

      // // Additional item prices for explicitly selected additional items
      // for (const categoryKey in additionalItems) {
      //   for (const itemName in additionalItems[categoryKey]) {
      //     if (additionalItems[categoryKey][itemName]) {
      //       let itemPrice = additionalItemPricing[categoryKey] || ADDITIONAL_ITEM_PRICE;
      //       if (categoryKey === 'desserts') {
      //         itemPrice = numPeople <= 99 ? 4 : 3.5;
      //       }

      //       // Check for premium property and add premium cost if applicable
      //       const premiumMultiplier = categories
      //         .find(category => category.key === categoryKey)
      //         ?.items.find(item => item.name === itemName)?.premium?.length || 0;
      //       const premiumCost = premiumMultiplier * 1 * numPeople;

      //       additionalPrice += (itemPrice * numPeople) + premiumCost;
      //     }
      //   }
      // }

      // Calculate premium cost for base items
      for (const categoryKey in baseItems) {
        for (const itemName in baseItems[categoryKey]) {
          if (baseItems[categoryKey][itemName]) {
            const premiumMultiplier = categories
              .find(category => category.key === categoryKey)
              ?.items.find(item => item.name === itemName)?.premium?.length || 0;
            const premiumCost = premiumMultiplier * 1 * numPeople;
            additionalPrice += premiumCost;
          }
        }
      }

      const total = basePrice + additionalPrice;
      return total < 0 ? 0 : total; // Ensure total is not negative
    };
    let x = 
    setTotalPrice(calculateTotalPrice());
  }, [baseItems, additionalItems, numPeople]);

  const handleBaseItemChange = (category, item) => {
    const isSelected = baseItems[category]?.[item.name] || false;

    // Update the baseItems state to allow selection and unselection
    setBaseItems((prev) => ({
      ...prev,
      [category]: {
        ...(prev[category] || {}),
        [item.name]: !isSelected
      }
    }));
  };

  const handleAdditionalItemChange = (category, item) => {
    const isSelected = additionalItems[category]?.[item.name] || false;

    // If user selected an additional item, update the additionalItems state
    setAdditionalItems((prev) => ({
      ...prev,
      [category]: {
        ...(prev[category] || {}),
        [item.name]: !isSelected
      }
    }));
  };

  const handleNumPeopleChange = (e) => {
    setNumPeople(Number(e.target.value));
  };

  const countSelectedBaseItems = () => {
    return Object.values(baseItems).reduce(
      (count, category) => count + Object.values(category).filter(Boolean).length,
      0
    );
  };

  // const handleSubmit = () => {
  //   console.log('Additional Items:', additionalItems);
  //   console.log('Number of People:', numPeople);
  //   console.log('Total Price:', totalPrice);
  // };

  function resetHandler() {
    setTotalPrice(0);
    setNumPeople(20);
    setAdditionalItems({});
    setBaseItems({});
  }

  const flattenBaseItems = (baseItems) => {
    return _.flatMap(baseItems, (category) => {
      return _.compact(
        _.map(category, (value, key) => (value ? { [key]: value } : null))
      );
    });
  };

  const MenuItemDisplay = ({ item }) => {

    if(_.has(item, 'premium')) {
      const asteriskCount = (item.premium.match(/\*/g) || []).length;
      return (
        <div>
          <span>{item.name}</span>
          <span className="item-label-premium">{'*'.repeat(asteriskCount)}</span>
        </div>
      );
    }
    return  <span>{item.name}</span>
  };

  const buildUrlWithParams = () => {
    const baseUrl = "https://forms.zohopublic.com/freshandexotic/form/CateringPackages1/formperma/TR0VVENo1C_fhm61oYAjrR2O0FB7p5dWFzXf2MIJacY";
    const categoryParamMap = {
      appetizers: 'apps',
      pasta: 'pastas',
      sandwiches: 'saw',
      meat: 'meats',
      seafood: 'sfds',
      salad: 'salads',
      sides: 'sides',
      desserts: 'dsrts',
    };
  
    const params = new URLSearchParams();
  
    const addItemsToParams = (items, categoryKey) => {
      const paramKey = categoryParamMap[categoryKey];
      for (const itemName in items) {
        if (items[itemName]) {
          params.append(paramKey, itemName);
        }
      }
    };
  
    for (const categoryKey in baseItems) {
      addItemsToParams(baseItems[categoryKey], categoryKey);
    }
  
    for (const categoryKey in additionalItems) {
      addItemsToParams(additionalItems[categoryKey], categoryKey);
    }

    params.append("info", additionalInfo);
  
    return `${baseUrl}?${params.toString().replace(/\+/g, '%20')}`;
  };
  
  const baseItemLimit = 10;
  const selectedBaseItemsCount = countSelectedBaseItems();
  
  return (
    <Grid stackable centered padded className='fne-calculator-container'>
      <Grid.Column width={12}>
        <Grid.Row>
          <Grid.Column width={8}>
            <header>
              <Image 
                src="https://assets-global.website-files.com/63e4695529a4df697ddf756f/63e46a0e464cafa79cc6ee10_FRESH-p-500.png"
                size="small"
              />
              <Header as={"h1"} content="STARTERS PACKAGE" />
              <p style={{color:"black", fontWeight:"400", marginTop:"10px"}}>Use this pricing calculator to explore our budget-friendly starters catering package, you can select any 5 items from our extensive menu. Any extra choices beyond these 5 will incur an additional charge.</p>
              <p style={{color:"red", fontWeight:"bold", marginTop:"10px"}}>- Items marked with (*) are premium items and will have an additional charge.</p>
              <p style={{color:"red", fontWeight:"bold"}}>- Desserts are not included in the starter package and will be priced separately</p>
              <List items={['20-49 people: 21$', '50-99 people: 19$', '100+ people: 17$']} bulleted/>
            </header>
          </Grid.Column>
          <Grid.Column  width={8}>
            <Grid className="calculator-container">
              <Grid.Row>
                <Grid.Column width={10} className="catering-form-column">
                  <Form>
                    <Header as="h3" className="form-header">Select Items</Header>
                    {categories.map((category, index) => (
                      <div key={index} className="category-container">
                        <Header as="h4" className="category-header">{category.name}</Header>
                        {category.items.map((item, idx) => (
                          <Form.Field key={idx} className="item-field">
                            <Checkbox
                              label={{ children: <MenuItemDisplay item={item}/> }} 
                              className="item-checkbox"
                              checked={
                                baseItems[category.key]?.[item.name] || additionalItems[category.key]?.[item.name] || false
                              }
                              onChange={() =>
                                selectedBaseItemsCount < baseItemLimit
                                  ? handleBaseItemChange(category.key, item)
                                  : handleAdditionalItemChange(category.key, item)
                              }
                              readOnly={category.key === "desserts" && _.size(flattenBaseItems(baseItems)) < 5}
                              disabled={selectedBaseItemsCount >= baseItemLimit}
                            />
                          </Form.Field>
                        ))}
                      </div>
                    ))}
                    <Form.Field key={'additionalInformation'} className="item-field">
                      <Header as="h4" className="category-header"><label>Additional Information</label></Header>
                      <TextArea placeholder='Additional Information' style={{ minHeight: 100 }} onChange={(e, { value }) => setAdditionalInfo(value)}/>
                    </Form.Field>  
                  </Form>
                </Grid.Column>
  
                <Grid.Column width={6} className="price-column">
                  <div className="sticky-price">
                    <div className="price-header">
                      <span>$</span>{totalPrice}
                    </div>
                    <div className="people-range-container">
                      <div>
                        <Input 
                          type="range" 
                          id="guests" 
                          name="guests" 
                          min="20"
                          max="500" 
                          step="5" 
                          value={numPeople}
                          onChange={handleNumPeopleChange}
                          className="people-range-input"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="items-label">Items: {_.size(flattenBaseItems(baseItems))}</div>
                      <div className="people-label">Guests: {numPeople}</div>
                    </div>
                    <div className="actions">
                      <Button size='small' onClick={resetHandler}>Reset</Button>
                      <Button 
                        disabled={_.size(flattenBaseItems(baseItems)) < STARTER_ITEM_LIMIT}
                        as="a" 
                        size='small' 
                        primary
                        href={buildUrlWithParams()}>
                          Next
                      </Button>
                    </div>
                  </div>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Grid.Column>
        </Grid.Row>
      </Grid.Column>
    </Grid>
  );
};  

export default CateringForm;

