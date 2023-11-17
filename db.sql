create table region (
    region_id serial primary key,
    name varchar(100) unique not null,
    url_value varchar(100) unique not null,
    latitude float not null,
    longitude float not null
);

create table province (
    province_id serial primary key,
    name varchar(100) unique not null,
    url_value varchar(100) unique not null,
    region_id int,
    foreign key (region_id) references region(region_id)
);

create table city (
    city_id serial primary key,
    name varchar(100) unique not null,
    display_name varchar(100) unique not null,
    url_value varchar(100) unique not null,
    province_id int,
    region_id int,
    foreign key (province_id) references province(province_id),
    foreign key (region_id) references region(region_id)
);

create table property_type (
    property_type_id serial primary key,
    name varchar(100) unique not null
);

create table listing_type (
    listing_type_id serial primary key,
    name varchar(100) unique not null,
    url_value varchar(100) unique not null
);

create table property_status (
    property_status_id serial primary key,
    name varchar(100) unique not null,
    url_value varchar(100) unique not null
);

create table turnover_status (
    turnover_status_id serial primary key,
    name varchar(100) unique not null,
    url_value varchar(100) unique not null
);

create table property (
    property_id serial primary key,
    listing_title varchar(255),
    listing_url varchar(255) unique,
    property_type_id int not null,
    listing_type_id int not null,
    property_status_id int not null,
    turnover_status_id int,
    current_price decimal(30,2) not null,
    year_built int,
    city_id int,
    address varchar(255),
    is_active boolean default true,
    is_cbd boolean default false,
    is_published boolean default false,
    data_source varchar(100) default 'mytreehouse',
    amenities text[],
    images text[],
    description text,
    longitude DECIMAL(11, 8),
    latitude DECIMAL(11, 8),
    lease_end date,
    last_scrape_update date,
    last_run_update date,
    unstructured_metadata json,
    created_at timestamp not null default current_timestamp,
    foreign key (property_type_id) references property_type(property_type_id),
    foreign key (city_id) references city(city_id),
    foreign key (listing_type_id) references listing_type(listing_type_id),
    foreign key (property_status_id) references property_status(property_status_id),
    foreign key (turnover_status_id) references turnover_status(turnover_status_id)
);

create table condominium (
    property_id int primary key,
    floor_area float not null,
    building_name varchar(100) not null,
    bedroom int default 0,
    bathroom int default 0,
    parking_lot int default 0,
    studio_type boolean default false,
    is_end_unit boolean default false,
    with_balcony boolean default false,
    foreign key (property_id) references property(property_id)
);

create table house_and_lot (
    property_id int primary key,
    floor_area float not null,
    lot_area float not null,
    bedroom int default 0,
    bathroom int default 0,
    parking_lot int default 0,
    is_corner_lot boolean default false,
    foreign key (property_id) references property(property_id)
);

create table townhouse (
    property_id int primary key,
    floor_area float not null,
    lot_area float not null,
    bedroom int default 0,
    bathroom int default 0,
    parking_lot int default 0,
    is_corner_lot boolean default false,
    foreign key (property_id) references property(property_id)
);

create table vacant_lot (
    property_id int primary key,
    lot_area float not null,
    is_corner_lot boolean default false,
    foreign key (property_id) references property(property_id)
);

create table property_price_history (
    price_id serial primary key,
    property_id int not null,
    price decimal(20,2) not null,
    date_recorded timestamp not null default current_timestamp,
    foreign key (property_id) references property(property_id)
);

create table leads (
    lead_id serial primary key,
    first_name varchar(100) not null,
    last_name varchar(100) not null,
    email varchar(100) unique,
    contact varchar(100) not null,
    subscribe_to_news_letter boolean default false
);

create table lead_valuated_property (
    lead_valuated_property_id serial primary key,
    lead_id int not null,
    property_type_id int not null,
    property_type varchar(100) not null,
    turnover_status_id int not null,
    turnover_status varchar(100) not null,
    property_address varchar(255) not null,
    city_id int not null,
    city varchar(100) not null,
    property_sqm int not null,
    year_built int not null,
    longitude decimal(10, 8),
    latitude decimal(10, 8),
    looking_to_sell varchar(255) not null,
    created_at timestamp not null default current_timestamp,
    foreign key (lead_id) references leads(lead_id),
    foreign key (property_type_id) references property_type(property_type_id),
    foreign key (turnover_status_id) references turnover_status(turnover_status_id),
    foreign key (city_id) references city(city_id)
);

create table scraper_api_data (
    html_data_id serial primary key,
    html_data text not null,
    scraper_api_status varchar(255) not null,
    scrape_url varchar(255) not null,
    scrape_finish boolean default false,
    finished_at timestamp,
    created_at timestamp not null default current_timestamp
);

create table scraper_api_key (
    api_key_id serial primary key,
    api_key varchar(255) unique,
    email varchar(100) unique,
    credits int default 1000,
    next_reset_date date,
    updated_at timestamp,
    created_at timestamp not null default current_timestamp
);

create table listing_website (
    listing_website_id serial primary key,
    website_url varchar(255),
    page_start int default 1,
    page_stop int default 100,
    created_at timestamp not null default current_timestamp
);

create table scraper_api_queue_job (
    api_job_queue_id serial primary key,
    attempts int default 0,
    status varchar(100) not null,
    status_url varchar(255) unique,
    website_url varchar(255),
    created_at timestamp not null default current_timestamp
);