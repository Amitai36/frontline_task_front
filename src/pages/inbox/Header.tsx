import { AppBar, Avatar, Button, ButtonGroup, Grid, Toolbar } from "@mui/material"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"

import SearchButton from "../../components/SearchButton"
import SendEmail from "../SendEmail"
import { Email } from "../../api/email/types"
import { Draft } from "../../api/draft/types"


interface HeaderProps {
    refetch: () => void
    emails: Email[] | Draft[]
    setEmails: React.Dispatch<React.SetStateAction<Email[] | Draft[]>>
}

const Header = (props: HeaderProps) => {
    const navigate = useNavigate()
    const { id } = useParams()
    const { refetch, emails, setEmails } = props
    const [search, setSearch] = useState('')
    const [sendEmail, setSendEmail] = useState(false)
    const { state: { name, lastName } } = useLocation()
    const handleSearch = () => {
        const filteringBySubject = emails.filter((email) => email.subject.includes(search)) as Email[] | Draft[]
        setEmails(filteringBySubject)
    }
    useEffect(() => {
        if (!emails) {
            refetch()
        }
    }, [search])
    return <>
        <AppBar >
            <Toolbar>
                <Grid container>
                    <Grid item xs={4} >
                        <ButtonGroup>
                            <Button onClick={() => navigate(`/user/${id}`, {
                                state: {
                                    name, lastName
                                }
                            })}>
                                Inbox
                            </Button>
                            <Button onClick={() => navigate(`/draft/${id}`, {
                                state: {
                                    name, lastName
                                }
                            })}>
                                Draft
                            </Button>

                        </ButtonGroup>
                    </Grid>
                    <Grid item xs={6}>
                        <SearchButton disabled={!emails} value={search} setValue={setSearch} handleSearch={handleSearch} />
                    </Grid>
                    <Grid item xs={1} width={"100%"}>
                        <Button onClick={() => setSendEmail(prev => !prev)}>new Email</Button>
                    </Grid>
                    <Grid item xs={1}>
                        {name && lastName && <Avatar>{name[0]}{lastName[0]}</Avatar>}
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
        <SendEmail refech={refetch} setValue={setSendEmail} value={sendEmail} />

    </>
}
export default Header