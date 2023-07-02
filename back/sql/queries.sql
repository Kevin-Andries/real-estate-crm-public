/* getOneUser */
SELECT email, firstname, lastname, username, account_type, plan_id, created_at FROM usr WHERE user_id=$1;

/* getOneUserWithEmail */
SELECT user_id, email, firstname, lastname, username, pwd, account_type, plan_id, created_at FROM usr WHERE email=$1

/* userExists */
SELECT EXISTS(SELECT 1 FROM usr WHERE user_id=$1)

/* getUserIdFromOAuthId */
SELECT user_id FROM oauth WHERE oauth_id=$1;

/* createOneUserFromOAuth */
INSERT INTO usr(email, firstname, lastname, username) VALUES($1, $2, $3, $4)
RETURNING user_id, email, firstname, lastname, username, account_type, plan_id, created_at;

/* createOneOAuthUser */
INSERT INTO oauth VALUES($1, $2);

/* createOneUserWithEmail */
INSERT INTO usr(email, firstname, lastname, pwd) VALUES($1, $2, $3, $4)
RETURNING user_id, email, firstname, lastname, account_type, plan_id, created_at;

/* getAllEstateFromUser */
SELECT * FROM estate WHERE owner_id=$1 AND is_online=TRUE AND is_public=TRUE;

/* getAllEstateFromMe */
SELECT * FROM estate WHERE owner_id=$1;

/* getOneEstate */
SELECT * FROM estate WHERE estate_id=$1;

/* getOneEstateWithPictures */
WITH pics AS(
	SELECT array_agg(pic_json.row_to_json) FROM
	(SELECT row_to_json(pic) FROM (SELECT picture_id FROM estate_picture WHERE estate_id=$1) AS pic) AS pic_json
) SELECT *, (SELECT * FROM pics) AS pictures FROM estate WHERE estate_id=$1;

/* getOneEstatePictures */
SELECT picture_id, estate_id FROM estate_picture WHERE estate_id=$1;

/* getPicture */
-- get is_Public from estate and id_on_disk from estate_picture in same request (join?)
-- try to make function that returns a record

/* isPicturePublic */
SELECT is_public FROM estate WHERE estate_id=(SELECT estate_id FROM estate_picture WHERE picture_id=$1);

/* getPictureIdOnDisk */
SELECT id_on_disk FROM estate_picture WHERE picture_id=$1;

/* incrementViewsCount */
UPDATE estate SET views_count = views_count + 1 WHERE estate_id=$1;

/* createEstate */
INSERT INTO estate VALUES(
	DEFAULT,
	$1,
	$2,
	$3,
	$4,
	$5,
	$6,
	$7,
	$8,
	$9,
	$10,
	$11,
	$12,
	$13,
	$14,
	$15,
	$16,
	$17,
	$18
) RETURNING estate_id;

/* createPicture */
INSERT INTO estate_picture VALUES(DEFAULT, $1, $2) RETURNING picture_id;

/* deleteEstate */
DELETE FROM estate WHERE estate_id=$1;

/* updateEstate */
-- UPDATE estate
-- SET 
-- estate_name = $2, 
-- is_public = $3, 
-- is_online = $4, 
-- rent_or_sell = $5,
-- price = $6,
-- rooms = $7,
-- bedrooms = $8,
-- bathrooms = $9,
-- description = $10,
-- square_meters = $11,
-- country = $12,
-- city = $13,
-- street = $14,
-- street_number = $15,
-- postcode = $16,
-- floor_number = $17,
-- apart_number = $18
-- WHERE estate_id = $1
-- RETURNING *;