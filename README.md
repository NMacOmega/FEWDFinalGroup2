# FEWDFinalGroup2

FEWD '22 Final Project, Group 2.

9/20 -- Katie:

1. added placeholder images
2. updated title of website
3. updated navbar with new page title
4. coded Featured Creators page for review by team.
5. Placed written work and placeholder art and avatars
6. adjusted speech bubble layout.

9/21 -- Katie:

1. Fixed Typo on questionnaire.html (Featured Creators)
2. Added own LinkedIn photo for use on meet the team section
3. Adjusted nav link titles & added a link to the sign up sheet.
4. Added drop shadows and adjusted styling on Featured Creators page.

9/22 -- Katie:

1. Updated copy across website, fixing typos and adjusting page titles.
2. Added stock image for possible logo to img directory.

9/26 -- Katie:

1. fixed path for Tanesha's Meet Our Staff photo to prevent an error.
2. Adjusted Nathaniel's Meet Our Staff photo to match specs of the other images in that row.
3. Adjusted filename for featured page & adjusted nav information to remove nav errors.
4. Attempted to adjust responsiveness of featured page, to no real avail.
5. Nathaniel adjusted the responsiveness of the featured page, resolving the errors! Thank you :D

9/27 -- Katie
1. Made very minor updates to website copy, such as adding spaces and rewording one sentence.
2. Updated featured2.css to reflect in Author Content as suggested.
3. Noticed an error with image on about us page for cfelton.png -- in opening it in photoshop and on windows, an error popped up stating the image wasn't a .png file. I cropped the image in photoshop and resaved it as a .jpg, which resolved the error.
4. Fixed file path notation so image error will not persist across previews for different users.

9/27 -- Nathaniel:

1. Added instructions to Readme file to include directions on using the prompt.html forms


# Prompt.html Page Instructions

If you Navigate to [prompt.html](prompt.html), You will find a form to get an image file resulting from a text input,
or get a blob of text resulting from an image upload by file name. If two works share a tag, one of the sources is chosen at random. If the word "admin" is included, all works are added to the selection. This functionality is limited to the following
interactions:

### Get Image from Text Form (Left Form)[^1]

| Type any of these words                                                             | Resulting Image                                                   |
| :-----------------------------------------------------------------------------------: | :----------------------------------------------------------------: |
| abstract<br />acrylic<br />art<br />color                                           | acrylic_paint_21_steve-johnson.jpg                                |
| war<br />europe<br />blood<br />death<br />expansion<br />battle<br />hundwardsland | battle_of_hundwardsland_Jans_von_Loydor.jpg                       |
| birds<br />boston<br />animal<br />warbler<br />tracing<br />spring<br />light      | boston-public-library_speckled_warblers_lawrence_mcrackenbire.jpg |
| soda<br />cola<br />beverage<br />abstract                                          | cola_julian_hochgesang.jpg                                        |
| europeana<br />flowers<br />piece                                                   | europeana_Stella_Artois.jpg                                       |
| eyes<br />abstract                                                                  | eyes_dan_farell.jpg                                               |
| paint<br />colour<br />color                                                        | four_water_colour_drops_of_paint_ashley-west_edwards.jpg          |
| bicycle<br />children<br />girl<br />boy<br />asian                                 | grow_yaopey-yong.jpg                                              |
| child<br />girl<br />boy<br />abstract                                              | inner_child_tim_huffner.jpg                                       |
| art<br />speckled<br />pattern                                                      | pattern_square_primary_speckled_robert_keane.jpg                  |
| abstract<br/>art                                                                    | untitle_ian_dooley.jpg                                            |

### Get Text from Image Form (Right Form)[^2]

##### \*The image itself is irrelevant, any `.jpeg, .jpg, .png, .gif, .jfif` file will work as long as the file name matches any of the criteria below:

| Any of these words in image file name | Resulting Text Block |
|:-----:|:-----:|
|love<br/>dog<br/>puppy| "You are a dog walker with little interest in anyone with fewer than four feet..." |
|thriller<br/>beach<br/>murder|"IT'S LIKE DANCING SITTING DOWN. Squeeze -- tap -- release -- twist..."|
|railroad<br/>steam<br/>America|"The year is 1830, and the American railroad system is beginning to..."|
|architecture<br/>beauty<br/>building|"Architecture should speak of its time and place, but yearn for timelessness..."|
|crow<br/>truck<br/>beach<br/>funny<br/>carr<br/>joke|"Researchers for the Massachusetts Turnpike Authority found over 200 dead crows near..."|

[^1]: These interactions are based on object `imageSources` located in [prompt-image-samples.js](https://github.com/KatieAlleena/FEWDFinalGroup2/blob/main/js/prompt-image-samples.js)
[^2]: These interactions are based on object `writingSources` in [prompt-writing-samples.js](https://github.com/KatieAlleena/FEWDFinalGroup2/blob/main/js/prompt-writing-samples.js)
