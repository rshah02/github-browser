import React, {Component} from 'react'
import {withStyles} from '@material-ui/core/styles'
import {observer} from 'mobx-react'
import theme from 'web-app/themes/Basic.theme'
import {config} from 'web-app/ui-configs/Retro.config'
import {Link} from 'react-router-dom'
import Divider from '@material-ui/core/Divider'
import {
  MaterialBox,
  MaterialTextField,
  MaterialDivider,
  MaterialCheckbox, MaterialCardContent
} from 'web-app/apps/platform/components/material'
import GithubIssueStoreStore from '../stores/GithubIssueStore.store'
import PlatformBasicButton from 'web-app/apps/platform/components/PlatformBasicButton.react'
import {MaterialCard} from 'themes/material'
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline'

class GithubIssueDetails extends Component {

  _toDate (value) {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }
    const newDate = new Date(value).toLocaleDateString('en-US', options)
    const newTime = new Date(value).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    })
    const dateString = newDate + ' ' + newTime
    return dateString
  }

  _renderComments () {
    let issue = GithubIssueStoreStore.getSelectedIssue()
    let comments = issue.comments.nodes
    let newList = []
    if (comments) {
      comments.map((comment) => {
        newList.push(<MaterialBox>
          <MaterialCard style={{padding: 20, border: '1px solid', marginTop:'10px'}}>
            <MaterialCardContent
              style={{
                border: '1px solid grey',
                borderRadius: '5px',
                boxShadow:
                  ' 0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)'
              }}
            >
              {comment.bodyText}
            </MaterialCardContent>
            <MaterialCardContent>
              <MaterialBox
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  padding: 20,
                  alignItems: 'center'
                }}
              >
                <MaterialBox>Updated by &nbsp;</MaterialBox>
                <MaterialBox>
                  <img
                    src={comment.author.avatarUrl}
                    style={{
                      width: '25px',
                      height: '25px',
                      borderRadius: '50px'
                    }}
                  ></img>
                </MaterialBox>
                <MaterialBox>
                  <p>&nbsp;{comment.author.login}</p>
                </MaterialBox>
                <MaterialBox>
                  "on" {this._toDate(comment.updatedAt)}
                </MaterialBox>
              </MaterialBox>
            </MaterialCardContent>
          </MaterialCard>
        </MaterialBox>)
      })
      return newList
    }
  }


  _renderOpCard () {
    let issue = GithubIssueStoreStore.getSelectedIssue()
    let list = []
    if (issue.participants.nodes) {
      issue.participants.nodes.map((node) => {
        list.push(
          <MaterialBox style={{display: 'flex', flexDirection: 'row'}}>
            <MaterialBox>
              <img
                src={node.avatarUrl}
                style={{
                  width: '25px',
                  height: '25px',
                  borderRadius: '50px'
                }}
              ></img>
            </MaterialBox>
            <MaterialBox style={{paddingRight: '10px'}}>
              {node.name}
            </MaterialBox>
            {node.email ? <MaterialBox>email: {node.email}</MaterialBox> : null}
          </MaterialBox>
        )
      })
    }

      return (
        <MaterialBox style={{width: '100%', marginTop: 20}}>
          <MaterialBox
            style={{width: '100%', display: 'flex', flexDirection: 'column'}}
          >
            <MaterialBox className='issueHeader'>
              <MaterialBox>
                <MaterialBox>
                  <h1>Issue Details</h1>
                </MaterialBox>

                <PlatformBasicButton
                  radius={50}
                  bgColor={'green'}
                  color={'white'}
                >
                  <Link
                    to={`\issues`}
                    style={{textDecoration: 'none', color: 'white'}}
                  >
                    Go back to issues
                  </Link>
                </PlatformBasicButton>
              </MaterialBox>
            </MaterialBox>
            <MaterialBox
              style={{
                with: '100%',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center'
              }}
            >
              <MaterialBox style={{width: '80%'}}>
                <h3 style={{fontSize: '36px', fontWeight: 400}}>
                  {issue.title}
                  <span style={{color: 'grey'}}></span>
                  {'#' + issue.number}{' '}
                </h3>
              </MaterialBox>
              <MaterialBox style={{width: '10%', justifyContent: 'center'}}>
                <PlatformBasicButton
                  radius={50}
                  bgColor={'green'}
                  color={'white'}
                  style={{width: '80px', color: 'white'}}
                >
                  {issue.state}
                </PlatformBasicButton>
              </MaterialBox>
              <MaterialBox
                style={{
                  width: '10%',
                  justifyContent: 'center',
                  display: 'flex',
                  flexDirection: 'row'
                }}
              >
                <ChatBubbleOutlineIcon></ChatBubbleOutlineIcon>
                <span> &nbsp;{issue.comments.totalCount}</span>
              </MaterialBox>
            </MaterialBox>
            <MaterialBox>
              <MaterialBox
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  padding: 20,
                  alignItems: 'center'
                }}
              >
                <MaterialBox>lastUpdated by &nbsp;</MaterialBox>
                <MaterialBox>
                  <img
                    src={issue.author.avatarUrl}
                    style={{
                      width: '25px',
                      height: '25px',
                      borderRadius: '50px'
                    }}
                  ></img>
                </MaterialBox>
                <MaterialBox>
                  <p>&nbsp;{issue.author.login}</p>
                </MaterialBox>
                <MaterialBox>"on" {this._toDate(issue.updatedAt)}</MaterialBox>
              </MaterialBox>
            </MaterialBox>
            <Divider></Divider>
            <MaterialBox
              style={{
                marginTop: '50px',
                display: 'flex',
                width: '100%',
                flexDirection: 'row',
                padding: 20,
                boxSizing: 'border-box'
              }}
            >
              <MaterialBox style={{width: '70%'}}>
                <MaterialBox>
                  <MaterialBox>
                    <h3> original issue </h3>
                  </MaterialBox>
                  <MaterialCard style={{padding: 20, border: '1px solid'}}>
                    <MaterialCardContent
                      style={{
                        border: '1px solid grey',
                        borderRadius: '5px',
                        boxShadow:
                          ' 0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)'
                      }}
                    >
                      {issue.bodyText}
                    </MaterialCardContent>
                    <MaterialCardContent>
                      <MaterialBox
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          padding: 20,
                          alignItems: 'center'
                        }}
                      >
                        <MaterialBox>Created by &nbsp;</MaterialBox>
                        <MaterialBox>
                          <img
                            src={issue.author.avatarUrl}
                            style={{
                              width: '25px',
                              height: '25px',
                              borderRadius: '50px'
                            }}
                          ></img>
                        </MaterialBox>
                        <MaterialBox>
                          <p>&nbsp;{issue.author.login}</p>
                        </MaterialBox>
                        <MaterialBox>
                          "on" {this._toDate(issue.createdAt)}
                        </MaterialBox>
                      </MaterialBox>
                    </MaterialCardContent>
                  </MaterialCard>
                </MaterialBox>
                <MaterialBox>
                  <MaterialBox>
                    <h3> Comments</h3>
                  </MaterialBox>
                  <MaterialBox>{this._renderComments()}</MaterialBox>
                </MaterialBox>
              </MaterialBox>
              <MaterialBox
                style={{
                  width: '30%',
                  padding: 10,
                  border:'1px solid grey',
                  borderRadius: '5px',
                  boxShadow:
                    ' 0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
                  marginLeft: '10px'
                }}
              >
                <MaterialBox>
                  <h2>participants</h2>
                </MaterialBox>
                <MaterialBox>
                  {/* {issue.participants.nodes.map((node) => node.name)} */}
                  {list}
                </MaterialBox>
              </MaterialBox>
            </MaterialBox>
          </MaterialBox>
        </MaterialBox>
      )
  }
  render () {
    return (
      <MaterialBox style={{padding:'20px'}}>
        {this._renderOpCard()}
      </MaterialBox>
    )
  }

}

GithubIssueDetails.displayName = 'GithubIssueDetails'
export default observer(GithubIssueDetails)
