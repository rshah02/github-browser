import React, {Component} from 'react'
import {observer} from 'mobx-react'
import { Link } from "react-router-dom";
import {toJS} from 'mobx'
import theme from 'web-app/themes/Basic.theme'
import DeleteForeverSharpIcon from '@material-ui/icons/DeleteForeverSharp'
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline'
import {
  MaterialGrid,
  MaterialPaper,
  MaterialButton,
  MaterialBox,
  MaterialSnackbar,
  MaterialChip,
  MaterialSelect,
  MaterialMenuItem,
  MaterialDivider,
  MaterialTable,
  MaterialTableBody,
  MaterialTableCell,
  MaterialTableHead,
  MaterialTableRow,
  MaterialTableFooter,
  MaterialTablePagination,
  MaterialListItem,
  MaterialList
} from 'themes/material'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import InputLabel from '@material-ui/core/InputLabel'
import Pagination from '@material-ui/lab/Pagination'
import {config} from 'web-app/ui-configs/Retro.config'
import './../EagleEye.css'
import GithubIssueStore from 'web-app/apps/eagle-eye/stores/GithubIssueStore.store'
import toDate from 'libs/date/date.lib'
import PlatformBasicButton from 'web-app/apps/platform/components/PlatformBasicButton.react'

class GithubIssueList extends Component {
  async componentDidMount() {
    await GithubIssueStore.fetchIssues()
  }

    _renderLogCard(log) {
    return (
      <TableRow key={log.id}>
        <TableCell align='left' style={{fontSize: 14}}>
          <MaterialBox>
            <MaterialBox
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center'
              }}
            >
              <MaterialBox style={{paddingRight:'10px'}}>
                <PlatformBasicButton
                  radius={50}
                  bgColor={'green'}
                  color={'white'}
                  style={{width: '80px', color: 'white'}}
                >
                  {log.state}
                </PlatformBasicButton>
              </MaterialBox>

              <MaterialBox
                style={{width: '85%'}}
                onClick={() => {
                  GithubIssueStore.setSelectedIssue(log)
                }}
              >
                <Link
                  to={`/details`}
                  style={{textDecoration: 'none', fontWeight: 'bold'}}
                >
                  <h3>{log.title}</h3>
                </Link>
              </MaterialBox>
              <MaterialBox
                style={{display: 'flex', flexDirection: 'row', width: '5%'}}
              >
                <ChatBubbleOutlineIcon></ChatBubbleOutlineIcon>
                <span> &nbsp;{log.comments.totalCount}</span>
              </MaterialBox>
            </MaterialBox>
            <MaterialBox>
              {'#' +
                log.number +
                ' opened on ' +
                toDate(log.createdAt) +
                ' by ' +
                log.author.login}
            </MaterialBox>
          </MaterialBox>
        </TableCell>
      </TableRow>
    )
  }

  _renderLogListCard() {
    let issueList = GithubIssueStore.getIssues()
    let totalCount=GithubIssueStore.getTotalCount()
    let renderedList = []
    if (issueList) {
      issueList.map((log) => {
        renderedList.push(this._renderLogCard(log))
      })
    }
    const columns = [
      {
        id: 'count',
        label:'Total '+ totalCount+' issues found',
        align: 'left',
        width: '100%'
      }

    ]
    return (
      <Table
        stickyHeader
        aria-label='sticky table'
      >
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.id}
                align={column.align}
                style={{width: column.width,backgroundColor:config.color_17}}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>{renderedList}</TableBody>
      </Table>
    )
  }


  render() {
    return (
      <MaterialBox
        style={{
          minHeight: '100%',
          display: 'flex',
          flexDirection: 'column',
          width: '100%'
        }}
      >
        <MaterialPaper style={{width: '100%', backgroundColor: config.color_1}}>
          <MaterialPaper
            style={{
              width: '100%',
              padding: 10,
              boxSizing: 'border-box'
            }}
          >
            <MaterialBox
              style={{
                backgroundColor: 'white',
                borderRadius: '5px',
                padding:10
              }}
            >
              <h1>
                Issues for the repository : &nbsp;
                <span>'Walmartlabs/thorax'</span>
              </h1>
            </MaterialBox>
          </MaterialPaper>
          <MaterialPaper
            className='loglistCard'
            style={{
              width: '100%',
              padding: 10,
              boxSizing: 'border-box'
            }}
          >
            <TableContainer
              style={{
                width: '100%',
                boxSizing: 'border-box',
                borderRadius: '5px',
                maxHeight: '100vh',
                backgroundColor: config.color_17
              }}
            >
              {this._renderLogListCard()}
            </TableContainer>
          </MaterialPaper>
          <MaterialPaper>
            <MaterialBox
              style={{display: 'flex', justifyContent: 'center', marginTop: 30}}
            >
              <MaterialBox>
                <PlatformBasicButton
                  radius={50}
                  bgColor={theme.primaryDark}
                  borderColor={
                    GithubIssueStore.hasPreviousPage
                      ? theme.primaryDark
                      : theme.primaryLight
                  }
                  fontColor={
                    GithubIssueStore.hasPreviousPage
                      ? theme.textPrimary
                      : theme.textSeondary
                  }
                  onClick={async () => {
                    console.log('clicker')

                    if (GithubIssueStore.hasPreviousPage) {
                      console.log('her')
                      // await EagleEyeAppStore.onClickPageOp('PREV')
                      GithubIssueStore.onClickPrev()
                    }
                  }}
                >
                  {'prev'}
                </PlatformBasicButton>
              </MaterialBox>
              <MaterialBox style={{marginLeft: 20}}>
                <PlatformBasicButton
                  radius={50}
                  bgColor={theme.primaryDark}
                  borderColor={
                    GithubIssueStore.hasNextpage
                      ? theme.primaryDark
                      : theme.primaryLight
                  }
                  fontColor={
                    GithubIssueStore.has
                      ? theme.textPrimary
                      : theme.textSeondary
                  }
                  onClick={async () => {
                    if (GithubIssueStore.hasNextpage) {
                      // EagleEyeAppStore.onClickPageOp('NEXT')
                      console.log(GithubIssueStore.endCursor)
                      GithubIssueStore.onClickNext()
                    }
                  }}
                >
                  {'next'}
                </PlatformBasicButton>
              </MaterialBox>
            </MaterialBox>
          </MaterialPaper>
        </MaterialPaper>
      </MaterialBox>
    )
  }
}

GithubIssueList.displayName = 'GithubIssueList'
export default observer(GithubIssueList)
