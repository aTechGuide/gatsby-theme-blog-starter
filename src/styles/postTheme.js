const postTheme = (theme) => ({
  
  header: {
    paddingBottom: '0px'
  },
  '@global': {
    '.firstword': {
      color: theme.palette.primary[500],
      fontSize: theme.spacing(3)
    },
    '.word' : { //<- Deprecate this
      color: theme.palette.primary[500]
    },
    '.irab' : {
      color: theme.palette.primary[500],
      display: 'block'
    },
    '.irabhighlight': {
      color: theme.headingColor[500]
    },
    '.heading1': {
      color: theme.headingColor[900]
    },
    '.heading2' : {
      color: theme.headingColor[400]
    },
    '.exception' : {
      color: theme.palette.error['dark'],
      display: 'inline'
    },
    '.bg-yellow' : {
      backgroundColor: theme.highlightOne[200],
      borderRadius: theme.spacing(.5)
    },
    '.bg-cyan' : {
      backgroundColor: theme.highlightTwo[50],
      borderRadius: theme.spacing(.5)
    },
    '.bg-green' : {
      backgroundColor: theme.highlightThree[100],
      borderRadius: theme.spacing(.5)
    },
    'h2' : {
      fontSize: "1.5rem",
      fontWeight: 500,
      color: theme.palette.secondary[700] ,
      margin: 0,
      marginTop: theme.spacing(2),
    },
    'h3' : {
      fontSize: "1.2rem",
      fontWeight: 500,
      color: theme.palette.secondary[700] ,
      margin: 0,
      marginTop: theme.spacing(2),
    },
    'h4' : {
      fontSize: "1rem",
      fontWeight: 500,
      color: theme.palette.secondary[700] ,
      margin: 0,
      marginTop: theme.spacing(2),
    },
    'p' : {
      margin: 0
    },
    'ul' : {
      margin: 0
    },
    'blockquote' : {
      margin: 0,
      padding: '1rem 1rem',
      borderLeft: '0.25rem solid',
      width: 'fit-content',
      borderTopRightRadius: theme.spacing(1),
      borderBottomRightRadius: theme.spacing(1),
      background: theme.palette.primary[50]
    },
    'blockquote > ul' : {
      paddingLeft : '20px'
    },
    '.arabic': {
      fontFamily :'Markazi Text'
    },
    'table' : {
      border : '1px solid',
      borderColor: theme.palette.primary[900],
      borderCollapse: 'collapse'
    },
    'thead' : {
      color : theme.palette.primary[500]
    },
    'td, th' : {
      textAlign : 'center',
      padding: '.25rem .5rem',
      border : '1px solid',
      borderColor: theme.palette.primary[900],
    },
    'tbody tr:nth-child(odd) td, tbody tr:nth-child(odd) th' : {
      backgroundColor : theme.palette.primary[50]
    }
  }
})

export default postTheme