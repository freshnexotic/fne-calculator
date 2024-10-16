import React, { useState, useEffect } from 'react';
import { Form, Checkbox, Button, Divider, Header, Grid, Input, Image, List } from 'semantic-ui-react';
import _ from "lodash"
import './App.css'; // Import custom CSS

const CateringForm = () => {
  const [baseItems, setBaseItems] = useState({});
  const [additionalItems, setAdditionalItems] = useState({});
  const [numPeople, setNumPeople] = useState(20); // Default number of people
  const [totalPrice, setTotalPrice] = useState(0);
  const STARTER_ITEM_LIMIT = 5;
  const ADDITIONAL_ITEM_PRICE = 3;

  // Pricing model
  const packagePricing = {
    starters: { '20-49': 21, '50-99': 19, '100+': 17 }
  };

  const additionalItemPricing = {
    appetizers: ADDITIONAL_ITEM_PRICE,
    pasta: ADDITIONAL_ITEM_PRICE,
    sandwiches: ADDITIONAL_ITEM_PRICE,
    meat: ADDITIONAL_ITEM_PRICE,
    seafood: ADDITIONAL_ITEM_PRICE,
    salad: ADDITIONAL_ITEM_PRICE,
    sides: ADDITIONAL_ITEM_PRICE,
    desserts: ADDITIONAL_ITEM_PRICE
  };

  const categories = [
    {
      name: 'Appetizer',
      key: 'appetizers',
      items: [
        { name: 'Shrimp Cocktail**', premium: '**' },
        { name: 'Meatballs' },
        { name: 'Stuffed Mushroom' },
        { name: 'Crab Cakes' },
      ]
    },
    {
      name: 'Pasta',
      key: 'pasta',
      items: [
        { name: 'Eggplant Parmigiana Pasta' },
        { name: 'Chicken Parmigiana Pasta' },
      ]
    },
    {
      name: 'Sandwich And Wrap',
      key: 'sandwiches',
      items: [
        { name: 'Mixed Tray Of Different Sandwiches' },
        { name: 'Pulled Pork Sandwich' },
      ]
    },
    {
      name: 'Meat',
      key: 'meat',
      items: [
        { name: 'Jerk Chicken' },
        { name: 'Curry Chicken' },
        { name: 'Chicken Stew' },
      ]
    },
    {
      name: 'Seafood**',
      key: 'seafood',
      items: [
        { name: 'Salmon Jerk', premium: '**' },
        { name: 'Salmon Honey Glazed', premium: '**' },
        { name: 'Grilled Salmon', premium: '**' },
        { name: 'Salmon Bites', premium: '**' },
      ]
    },
    {
      name: 'Salad',
      key: 'salad',
      items: [
        { name: 'Caesar Salad' },
        { name: 'Greek Salad' },
      ]
    },
    {
      name: 'Sides',
      key: 'sides',
      items: [
        { name: 'White Rice' },
        { name: 'Veggie Rice' },
        { name: 'Plantains' },
      ]
    },
    {
      name: 'Dessert',
      key: 'desserts',
      items: [
        { name: 'Cookies' },
        { name: 'Brownies' },
      ]
    },
    {
      name: 'Beverage',
      key: 'beverage',
      items: [
        { name: 'None - The hosts will provide all of the beverage' },
        { name: 'Non-Alcoholic Beverages - (Soda - Water)' },
        { name: 'Signature Mocktails' },
        { name: 'Coffee/Tea Station' }
      ]
    }
  ];

  // Determine the pricing tier based on the number of people
  const getPricingTier = () => {
    if (numPeople >= 15 && numPeople <= 49) return '20-49';
    if (numPeople >= 50 && numPeople <= 99) return '50-99';
    return '100+';
  };

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

    // Additional item prices for explicitly selected additional items
    for (const categoryKey in additionalItems) {
      for (const itemName in additionalItems[categoryKey]) {
        if (additionalItems[categoryKey][itemName]) {
          let itemPrice = additionalItemPricing[categoryKey] || ADDITIONAL_ITEM_PRICE;
          if (categoryKey === 'desserts') {
            itemPrice = numPeople <= 99 ? 4 : 3.5;
          }

          // Check for premium property and add premium cost if applicable
          const premiumMultiplier = categories
            .find(category => category.key === categoryKey)
            ?.items.find(item => item.name === itemName)?.premium?.length || 0;
          const premiumCost = premiumMultiplier * 1 * numPeople;

          additionalPrice += (itemPrice * numPeople) + premiumCost;
        }
      }
    }

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

  useEffect(() => {
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

  const handleSubmit = () => {
    console.log('Additional Items:', additionalItems);
    console.log('Number of People:', numPeople);
    console.log('Total Price:', totalPrice);
  };

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

  const buildUrlWithParams = () => {
    const baseUrl = "https://forms.zohopublic.com/freshandexotic/form/CateringPackages1/formperma/TR0VVENo1C_fhm61oYAjrR2O0FB7p5dWFzXf2MIJacY";
    const categoryParamMap = {
      appetizers: 'apps',
      pasta: 'pastas',
      sandwiches: 'saw',
      meat: 'meats',
      seafood: 'sfds',
      salad: 'salds',
      sides: 'sides',
      desserts: 'dsrts'
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
  
    return `${baseUrl}?${params.toString().replace(/\+/g, '%20')}`;
  };
  
  const baseItemLimit = 10;
  const selectedBaseItemsCount = countSelectedBaseItems();
  
  return (
    <Grid stackable centered padded>
      <Grid.Column width={12}>
        <Grid.Row>
          <Grid.Column width={8}>
            <header>
              <Image 
                src="https://assets-global.website-files.com/63e4695529a4df697ddf756f/63e46a0e464cafa79cc6ee10_FRESH-p-500.png"
                size="small"
              />
              <Header as={"h1"} content="STARTERS PACKAGE" />
              <p>Explore our budget-friendly starters catering package, you can select any 5 items from our extensive menu. Any extra choices beyond these 5 will incur an additional charge.</p>
              <p style={{color:"red", fontWeight:"bold"}}>- Items marked with (*) are premium items and will have an additional charge.</p>
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
                              label={item.name}
                              className="item-checkbox"
                              checked={
                                baseItems[category.key]?.[item.name] || additionalItems[category.key]?.[item.name] || false
                              }
                              onChange={() =>
                                selectedBaseItemsCount < baseItemLimit
                                  ? handleBaseItemChange(category.key, item)
                                  : handleAdditionalItemChange(category.key, item)
                              }
                              disabled={
                                selectedBaseItemsCount >= baseItemLimit &&
                                !baseItems[category.key]?.[item.name] &&
                                !additionalItems[category.key]?.[item.name]
                              }
                            />
                          </Form.Field>
                        ))}
                        {/* <Divider /> */}
                      </div>
                    ))}
  
                    <Button type="submit" onClick={handleSubmit} className="submit-button">
                      Submit
                    </Button>
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
                          type="number" 
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
                      <div className="people-label">Approximate Guests: {numPeople}</div>
                      <div className="items-label">Items Selected: {_.size(flattenBaseItems(baseItems))}</div>
                    </div>
                    <div className="actions">
                      <Button size='small' onClick={resetHandler}>Reset</Button>
                      <Button 
                        disabled={_.size(flattenBaseItems(baseItems)) < STARTER_ITEM_LIMIT}
                        as="a" 
                        size='small' 
                        href={buildUrlWithParams()}>
                          Place Your Request
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

