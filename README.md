# Sticky Notes
Web app for jotting down thoughts in the form of colourful little sticky notes.

# Usage
The app can be accessed by visiting the site where it's hosted, [here](https://devweb2020.cis.strath.ac.uk/~qsb19184/sticky-notes-asdfghjkl/).

## Adding Notes
Adding notes is as simple as typing in the text area at the top of the page and clicking 'Add Note'. <br/><br/>
![usage-adding](https://user-images.githubusercontent.com/47461489/113029050-e72a8980-9183-11eb-8383-472613caddb7.gif)

## Viewing Notes
All notes are displayed on the main page. To view a note directly, you can click on it. <br/><br/>
![usage-viewing](https://user-images.githubusercontent.com/47461489/113029070-eb56a700-9183-11eb-83d7-959459ec21af.gif)

## Deleting Notes
If you want to delete a note, click on it to bring up the full view, then click the trash icon in the bottom right and confirm. <br/><br/>
![usage-deleting](https://user-images.githubusercontent.com/47461489/113029086-ef82c480-9183-11eb-95ed-6639e33dd6e2.gif)

## Storage
The app stores notes locally using [jakearchibald's idb library](https://github.com/jakearchibald/idb), a modification of IndexedDB that uses Promises.
