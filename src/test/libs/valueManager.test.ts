import { test, expect } from "vitest";
import parseChanges, { MinMaxRule, RuleList, parseChange } from "../../libs/ValueManager";

type ExampleDataType = {
    temperature: number,
    latitude: number,
    longitude: number,
    lowerTemp: number,
}

const exampleRuleList: RuleList<ExampleDataType> = {
    temperature: new MinMaxRule(0, 100),
    latitude: new MinMaxRule(-90, 90),
    longitude: new MinMaxRule(-180, 180),
    lowerTemp: new MinMaxRule(null, "temperature")
}

const exampleData: ExampleDataType = {
    temperature: 24,
    latitude: 25,
    longitude: 60,
    lowerTemp: 19,
}

test('Parse change', ()=> {
    const changes = parseChange(exampleData, 'temperature', 100, exampleRuleList.temperature)
    expect.soft(changes).toEqual({'temperature': 100})
    const change1 = parseChange(exampleData, 'temperature', 101, exampleRuleList.temperature)
    expect.soft(change1).toEqual({})
})

test('Parse changes', ()=> {
    let expectedChanges: Partial<ExampleDataType> = {'lowerTemp': 18, 'temperature': 20, }
    let changes = parseChanges(exampleData, expectedChanges, exampleRuleList)
    expect.soft(changes).toEqual({...exampleData, ...expectedChanges})

    expectedChanges = {'lowerTemp': 21, 'temperature': 20, }
    changes = parseChanges(exampleData, expectedChanges, exampleRuleList)
    expect.soft(changes).toEqual({...exampleData, 'temperature': 20})

    expectedChanges = {'temperature': 18, }
    changes = parseChanges(exampleData, expectedChanges, exampleRuleList)
    expect.soft(changes).toEqual({...exampleData, 'temperature': 18, 'lowerTemp': 18})
})

test('MinMaxRule numerical basics', ()=> {
    const x = new MinMaxRule<ExampleDataType>(1, 10);
    expect.soft(x.test(exampleData, 2)).toBe(true)
    expect.soft(x.test(exampleData, 11)).toBe(false)
    expect.soft(x.test(exampleData, 0)).toBe(false)
    expect.soft(x.test(exampleData, 1)).toBe(true)
    expect.soft(x.test(exampleData, 10)).toBe(true)
});

test('MinMaxRule getting other values', ()=> {
    expect.soft(exampleRuleList.lowerTemp.test(exampleData, 20)).toBe(true) 
    expect.soft(exampleRuleList.lowerTemp.test(exampleData, 25)).toBe(false)
    expect.soft(exampleRuleList.lowerTemp.test(exampleData, -3894753)).toBe(true)
    expect.soft(exampleRuleList.lowerTemp.test(exampleData, 24)).toBe(true)
});