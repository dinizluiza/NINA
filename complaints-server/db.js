const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

const places = ['bus', 'bus_terminal', 'subway', 'bus_stop', 'subway_terminal'];
const situations = ['unsolved', 'solved', 'in_progress'];
const types = ['groping', 'stalking', 'unwanted_photos', 'verbal_aggression', 'physical_aggression'];
const genders = ['woman_cis', 'man_cis', 'woman_trans', 'man_trans', 'non-binary']

function getRandomInt() {
  return Math.floor(Math.random() * 70)
}

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomBoolean() {
  return Math.random() < 0.5;
}

function getRandomDate() {
  const start = new Date(2020, 0, 1);
  const end = new Date();
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString();
}

function build_complaints(count) {
  const complaints = [];

  for (let i = 0; i < count; i++) {
    const complaint = {
      _id: uuidv4(),
      place: getRandomItem(places),
      at_moment: getRandomBoolean(),
      datetime: getRandomDate(),
      modified_at: getRandomDate(),
      created_at: getRandomDate(),
      description: `Complaint ${i + 1}`,
      situation: [getRandomItem(situations)],
      type: [getRandomItem(types)],
      victim_gender: getRandomItem(genders),
      victim_age: getRandomInt()
    };
    complaints.push(complaint);
  }

  const data = JSON.stringify({ complaints }, null, 2);
  fs.writeFileSync('db.json', data);
  console.log('Data updated!')
}

build_complaints(75);