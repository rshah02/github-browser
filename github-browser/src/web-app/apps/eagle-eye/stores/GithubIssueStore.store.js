import {decorate, observable, action,toJS} from 'mobx'
import {graphql} from 'libs/graphql/'

class GithubIssueStore {
  constructor() {
    this.resetFields()
    this.status = null
  }

  resetFields() {
    this.name = null
    this.id = null
    this.gitUrl = null
    this.contrastAppId = null
    this.selectedItems = null
    this.displayName = null
    this.userGroups = null
  }

  async fetchIssues() {
    let query = `
     query($after:String){
  repository(owner:"walmartlabs",name:"thorax"){
    issues(first:10,after:$after,orderBy:{direction:DESC,field:CREATED_AT}){
      pageInfo{
        endCursor
        startCursor
        hasNextPage
        hasPreviousPage
      }
      totalCount
      nodes{
        id
        author{
          avatarUrl
          login
        }
        state
        createdAt
       comments(first:10){
          totalCount
          nodes{
            author{
              login
              avatarUrl
            }
            bodyText
            updatedAt
          }
        }
        bodyText
        number
        updatedAt
        title
         participants(first:2){
          totalCount
          nodes{
            name
            email
            avatarUrl
          }
        }
      }
    }
  }
}
    `
    let variables = {
      after: null
    }
    let response = await graphql(query, variables)
    if (response.status === 200) {
      response = response.data.data.repository.issues
      console.log(response)
      this.setTotalCount(response.totalCount)
      this.setHasNextpage(response.pageInfo.hasNextPage)
      this.setHasPreviousPage(response.pageInfo.hasPreviousPage)
      this.setEndCursor(response.pageInfo.endCursor)
      this.setStartCursor(response.pageInfo.startCursor)
      this.setHasPreviousPage(response.pageInfo.hasPreviousPage)
      // this.setIssues(response.nodes)
      return this.setIssues(response.nodes)
    }
  }

  async fetchNextIssues() {
    let hasNextPage = this.hasNextpage

    let query = `
     query($after:String){
  repository(owner:"walmartlabs",name:"thorax"){
    issues(first:10,after:$after,orderBy:{direction:DESC,field:CREATED_AT}){
      pageInfo{
       hasNextPage
        endCursor
        startCursor
        hasNextPage
        hasPreviousPage
      }
      totalCount
      nodes{
        id
        author{
          avatarUrl
          login
        }
        state
        createdAt
       comments(first:10){
          totalCount
          nodes{
            author{
              login
              avatarUrl
            }
            bodyText
            updatedAt
          }
        }
        bodyText
        number
        updatedAt
        title
         participants(first:2){
          totalCount
          nodes{
            name
            email
            avatarUrl
          }
        }
      }
    }
  }
}
    `
    let variables = {
      after: this.hasNextpage ? this.endCursor : null
    }
    let response = await graphql(query, variables)
    if (response.status === 200) {
      response = response.data.data.repository.issues
      console.log(response)
      this.setTotalCount(response.totalCount)
      this.setHasNextpage(response.pageInfo.hasNextPage)
      this.setHasPreviousPage(response.pageInfo.hasPreviousPage)
      this.setEndCursor(response.pageInfo.endCursor)
      this.setStartCursor(response.pageInfo.startCursor)
      this.setHasPreviousPage(response.pageInfo.hasPreviousPage)
      // this.setIssues(response.nodes)
      return this.setIssues(response.nodes)
    }
  }

  async fetchPreviousIssues() {
    let hasPreviousPage = this.hasPreviousPage

    let query = `
     query($before:String){
  repository(owner:"walmartlabs",name:"thorax"){
    issues(first:10,before:$before,orderBy:{direction:DESC,field:CREATED_AT}){
      pageInfo{
        hasNextPage
        endCursor
        startCursor
        hasPreviousPage
      }
      totalCount
      nodes{
        id
        author{
          avatarUrl
          login
        }
        state
        createdAt
       comments(first:10){
          totalCount
          nodes{
            author{
              login
              avatarUrl
            }
            bodyText
            updatedAt
          }
        }
        bodyText
        number
        updatedAt
        title
         participants(first:2){
          totalCount
          nodes{
            name
            email
            avatarUrl
          }
        }
      }
    }
  }
}
    `
    let variables = {
      before: this.hasPreviousPage ? this.startCursor : null
    }
    let response = await graphql(query, variables)
    if (response.status === 200) {
      response = response.data.data.repository.issues
      console.log(response)
      this.setTotalCount(response.totalCount)
      this.setHasNextpage(response.pageInfo.hasNextPage)
      this.setHasPreviousPage(response.pageInfo.hasPreviousPage)
      this.setEndCursor(response.pageInfo.endCursor)
      this.setStartCursor(response.pageInfo.startCursor)
      // this.setIssues(response.nodes)
      return this.setIssues(response.nodes)
    }
  }

  getTotalCount() {
    return this.totalCount
  }
  setTotalCount(totalCount) {
    this.totalCount = totalCount
    return this.totalCount
  }

  getIssues() {
    return this.issues
  }

  setIssues(issues) {
    this.issues = issues
    return this.issues
  }

  getSelectedIssueNumber() {
    return this.setSelectedIssueNumber
  }

  setSelctedIssueNumber(selectedIssueNumber) {
    this.selectedIssueNumber = selectedIssueNumber
    return this.selectedIssueNumber
  }

  getSelectedIssue() {
    return this.selectedIssue
  }

  setSelectedIssue(selectedIssue) {
    this.selectedIssue = selectedIssue
    return this.selectedIssue
  }

  getViewMode() {
    return this.viewMode
  }

  getShowSearchCardLoader() {
    return this.showSearchCardLoader
  }

  setShowSearchCardLoader(showSearchCardLoader) {
    this.showSearchCardLoader = showSearchCardLoader
    return this.showSearchCardLoader
  }

  getEndCursor() {
    return this.endCursor
  }

  setEndCursor(endCursor) {
    this.endCursor = endCursor
    console.log("end",this.endCursor)
  }

  setStartCursor(startCursor) {
    this.startCursor = startCursor
    console.log("start", this.startCursor)
  }

  getStartCursor() {
    return this.setStartCursor()
  }

  setHasNextpage(hasNextPage) {
    this.hasNextpage = hasNextPage
    return this.hasNextPage
  }

  getHasNextPage() {
    return this.hasNextpage
  }

  setHasPreviousPage(hasPreviousPage) {
    this.hasPreviousPage = hasPreviousPage
    console.log("set",this.hasPreviousPage)
  }

  getHasPreviousPage() {
    return this.hasPreviousPage
  }

  onClickNext() {
    if (this.hasNextpage) {
      if (this.endCursor) {
        this.fetchNextIssues()
      }
    }
  }

  onClickPrev() {
    if (this.hasPreviousPage) {
        console.log("prev",this.hasPreviousPage)
        this.fetchPreviousIssues()
    }
  }
}

decorate(GithubIssueStore, {
  endCursor: observable,
  issues: observable,
  selectedIssue: observable,
  showSearchCardLoader: observable,
  totalCount: observable,
  hasNextPage: observable,
  hasPreviousPage: observable,
  startCursor:observable
})

export default new GithubIssueStore()
