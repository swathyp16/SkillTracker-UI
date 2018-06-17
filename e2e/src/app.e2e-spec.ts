import { AppPage } from './app.po';
import { browser, element, by, WebDriver }from 'protractor';
describe('angular js home page', () => {
  browser.get('/');
  var path = require('path');
  
  it('should display the home page', () => {
    expect(element(by.id('home-page')).isPresent()).toBe(true);
  });
  
  it('should display welcome message', () => {
    expect(element(by.css('span.heading')).getText()).toEqual("WELCOME TO SKILL TRACKER");
  });

  it('should click add skill button on the nav bar', () => {
    element(by.id('add-skill-navbar')).click();
    browser.sleep(3000);
    expect(element(by.id('add-skill-div')).isPresent()).toBe(true);
  });

  it('should add a skill on the add skill page', () => {
    element(by.id('skill-name')).sendKeys('Java');
    element(by.css('.div-style button[type=submit]')).click();
    browser.sleep(3000);
    expect(element(by.id('skill-name')).isPresent()).toBe(true);
  });

  it('should edit skill on add skill page', () => {
    element(by.css('.add-skill-table input[type=button]')).click();
    element(by.css('.add-skill-table input[type=text]')).clear();
    element(by.css('.add-skill-table input[type=text]')).sendKeys('Bootstrap');
    element(by.css('.add-skill-table input[type=button]')).click();
    browser.sleep(3000);
    expect(element(by.id('skill-name')).isPresent()).toBe(true);
  });
  
  it('should return back to the search page', () => {
    element(by.id('search-navbar')).click();
    browser.sleep(3000);
    expect(element(by.id('searchAssociates')).isPresent()).toBe(true);
  });

  it('should display add associate page', () => {
    element(by.id('add-associate-btn')).click();
    browser.sleep(3000);
    expect(element(by.id('associate-name')).isPresent()).toBe(true);
    expect(element(by.id('associate-id')).isPresent()).toBe(true);
    expect(element(by.id('email')).isPresent()).toBe(true);
    expect(element(by.id('mobile')).isPresent()).toBe(true);
    expect(element(by.id('remarks')).isPresent()).toBe(true);
    expect(element(by.id('skills')).isPresent()).toBe(true);
    expect(element(by.id('weakness')).isPresent()).toBe(true);
    expect(element(by.id('strength')).isPresent()).toBe(true);
    expect(element(by.id('other')).isPresent()).toBe(true);
  });

  it('should add associate', () => {
    element(by.id('associate-name')).sendKeys("Tom");
    element(by.id('associate-id')).sendKeys(45896);
    element(by.id('email')).sendKeys("tom.thomas@gmail.com");
    element(by.id('mobile')).sendKeys(9874563120);
    element(by.css('.radio-grp')).all(by.tagName('input[type="radio"]')).get(0).click();
    element(by.css('.status-div')).all(by.tagName('button[type=button]')).get(0).click();
    element(by.css('.input-level')).all(by.tagName('input[type=button]')).get(0).click();
    element(by.id('remarks')).sendKeys("Good");
    element(by.id('weakness')).sendKeys("UI");
    element(by.id('strength')).sendKeys("Backend");
    var fileToUpload = '../../src/app/images/test-icon.png';
    var absolutePath = path.resolve(__dirname, fileToUpload);  
    element(by.css('input[type="file"]')).sendKeys(absolutePath);
    var slider = element(by.id('skills'));
    browser.actions().dragAndDrop(slider, {
      x: 15,
      y: 0
    }).perform();
    browser.sleep(3000); 
    element(by.buttonText("Save")).click();
  });

  it('should display skill graph on search page', () => {
    element(by.id('search-navbar')).click();
    browser.sleep(3000);
    expect(element(by.css('div.skill-graph')).isPresent()).toBe(true);
  });

  it('should view all associates', () => {    
    expect(element.all(by.tagName('table tbody tr')).count()).toBeGreaterThan(0);
  });

  it('should display edit associate page on edit button click', () => {
    element(by.id('edit-associate')).click();
    browser.sleep(3000);
    expect(element(by.css('.search-container h1')).getText()).toEqual('Edit Associate');
    expect(element(by.id('associateName')).isPresent()).toBe(true);
    expect(element(by.id('associateId')).isPresent()).toBe(true);
    expect(element(by.id('email')).isPresent()).toBe(true);
    expect(element(by.id('mobile')).isPresent()).toBe(true);
    expect(element(by.id('remarks')).isPresent()).toBe(true);
    expect(element(by.id('weakness')).isPresent()).toBe(true);
    expect(element(by.id('strength')).isPresent()).toBe(true);
    expect(element(by.id('other')).isPresent()).toBe(true);
  });

  it('should return back to the search page', () => {
    element(by.id('search-navbar')).click();
    browser.sleep(3000);
    expect(element(by.id('searchAssociates')).isPresent()).toBe(true);
  });

  it('should display view associate page on view button click', () => {
    element(by.id('view-associate')).click();
    browser.sleep(3000);
    expect(element(by.css('.search-container h1')).getText()).toEqual('View Associate');
    expect(element(by.id('associateName')).isPresent()).toBe(true);
    expect(element(by.id('associateId')).isPresent()).toBe(true);
    expect(element(by.id('email')).isPresent()).toBe(true);
    expect(element(by.id('mobile')).isPresent()).toBe(true);
    expect(element(by.id('remarks')).isPresent()).toBe(true);
    expect(element(by.id('weakness')).isPresent()).toBe(true);
    expect(element(by.id('strength')).isPresent()).toBe(true);
    expect(element(by.id('other')).isPresent()).toBe(true);
  });

});
