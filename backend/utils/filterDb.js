class FilterDb {
  constructor(query, queryStr) {
    //  here query is , when we not use await with
    //Journal.find() it returns a promise query so that we can use it same
    //we will create querystr and at the end use the same query promise to search
    this.query = query;
    this.queryStr = queryStr; // query str is an object which recieved from user
  }

  titleFilter() {
    const keyword = this.queryStr.title
      ? {
          title: {
            $regex: this.queryStr.title, // regex to find this keyword in anywhere in title
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...keyword }); // here same we dont use await because we have to again use this query rpomise

    return this;
  }

  emailFilter() {
    const keyword = this.queryStr.email
      ? {
          email: {
            $regex: this.queryStr.email, // regex to find this keyword in anywhere in title
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...keyword }); // here same we dont use await because we have to again use this query rpomise

    return this;
  }

  idFilter(){
    const keyword = this.queryStr.id?.toString()
    ? {
      ms_id: {
          $regex: this.queryStr.id?.toString(), // regex to find this keyword in anywhere in title
          $options: "i",
        },
      }
    : {};

  this.query = this.query.find({ ...keyword }); // here same we dont use await because we have to again use this query rpomise

  return this;
  }

  nameFilter() {
    const keyword = this.queryStr.name
      ? {
          name: {
            $regex: this.queryStr.name, // regex to find this keyword in anywhere in title
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...keyword }); // here same we dont use await because we have to again use this query rpomise

    return this;
  }


  authorFilter() {
    const keyword = this.queryStr.author
      ? {
          author: {
            $regex: this.queryStr.author, // regex to find this keyword in anywhere in title
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...keyword }); // here same we dont use await because we have to again use this query rpomise

    return this;
  }

  yearFilter() {
    // const querCopy = { ...this.queryStr };

    
    // const removeFields = ["title", "page", "author"];

    // removeFields.forEach((key) => delete querCopy[key]);

    // console.log(this.queryStr)
    // let queryStrTemp = JSON.stringify(querCopy);
    // queryStrTemp = queryStrTemp.replace(
    //   /\b(gt|gte|lt|lte)\b/g,
    //   (key) => `$${key}`
    // );

    if(this.queryStr.year!=0){
      // console.log(this.queryStr.year!=0)
      const year = this.queryStr.year
      this.query = this.query.find({year:year?.toString()});
    }

    // const encodedDate = encodeURIComponent(dateToSend);  from fronetend
    // to send 2023-12-22T05:35:08.408Z data as 2023-12-22T05%3A35%3A08.408Z

    return this;
  }

  pagination(resultPerPage){
    const currentPage = Number(this.queryStr.page) || 1;
  
    const skip = resultPerPage * (currentPage - 1);

    this.query = this.query.limit(resultPerPage).skip(skip);

    return this;
  }
}

export default FilterDb;
