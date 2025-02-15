import React from 'react';
import Router, { useRouter } from 'next/router';
import Head from 'next/head';

import { Avatar, Divider, Grid, Tab, Tabs, Typography, useMediaQuery } from '@mui/material';
import { Box } from '@mui/system';

import Layout from '@/components/Layout';
import Image from 'next/image';

export default function UserPage(props) {
    /** @type {import('next-auth').Session} */ const session = props.session;
    /** @type {Boolean} */ const loading = props.loading;
    /** @type {User} */ const user = props.user;

    const router = useRouter();
    if(!user && typeof window !== 'undefined') router.push('/dashboard');

    return loading || !user ? <Layout loading title='Viewing Profile' session={session}></Layout> : (
        <>
            <Head>
                <title>Guardian Dashboard</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Box sx={{ display: 'flex', height: '100%', width: '100%' }}>
                <Box style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', width: '100%' }}>
                    <Avatar src={`${user.displayAvatarURL}?size=128`} sx={{ width: 128, height: 128 }} />
                    <Typography variant="h3">{user.username}#{user.discriminator}</Typography>

                    {/* TODO:// figure out server & nitro */}
                    <Box display='flex'>
                        <Image style={{ display: user.public_flags >> 0 & 1 == 1 ? 'block' : 'none' }} width={40} height={40} alt='Discord Staff' src='https://discord.id/img/flags/0.png' />
                        <Image style={{ display: user.public_flags >> 1 & 1 == 1 ? 'block' : 'none' }} width={40} height={40} alt='Discord Partner' src='https://discord.id/img/flags/1.png' />
                        <Image style={{ display: user.public_flags >> 2 & 1 == 1 ? 'block' : 'none' }} width={40} height={40} alt='Hypesquad Event' src='https://discord.id/img/flags/2.png' />
                        <Image style={{ display: user.public_flags >> 3 & 1 == 1 ? 'block' : 'none' }} width={40} height={40} alt='Bug Hunter' src='https://discord.id/img/flags/3.png' />
                        <Image style={{ display: user.public_flags >> 6 & 1 == 1 ? 'block' : 'none' }} width={40} height={40} alt='Hypesquad Bravery' src='https://discord.id/img/flags/6.png' />
                        <Image style={{ display: user.public_flags >> 7 & 1 == 1 ? 'block' : 'none' }} width={40} height={40} alt='Hypesquad Brilliance' src='https://discord.id/img/flags/7.png' />
                        <Image style={{ display: user.public_flags >> 8 & 1 == 1 ? 'block' : 'none' }} width={40} height={40} alt='Hypesquad Balance' src='https://discord.id/img/flags/8.png' />
                        <Image style={{ display: user.public_flags >> 9 & 1 == 1 ? 'block' : 'none' }} width={40} height={40} alt='Early Supporter' src='https://discord.id/img/flags/9.png' />
                        <Image style={{ display: user.public_flags >> 14 & 1 == 1 ? 'block' : 'none' }} width={40} height={40} alt='Bug Hunter Level 2' src='https://discord.id/img/flags/14.png' />
                        <Image style={{ display: user.public_flags >> 17 & 1 == 1 ? 'block' : 'none' }} width={40} height={40} alt='Verified Bot Developer' src='https://discord.id/img/flags/17.png' />
                        <Image style={{ display: user.public_flags >> 18 & 1 == 1 ? 'block' : 'none' }} width={40} height={40} alt='Discord Certified Moderator' src='https://discord.id/img/flags/18.png' />
                        <Image style={{ display: user.public_flags >> 22 & 1 == 1 ? 'block' : 'none' }} width={40} height={40} alt='Active Developer' src='https://discord.id/img/flags/22.png' />
                    </Box>

                    <Divider style={{ width: '100%', marginTop: '10px', marginBottom: '10px' }}></Divider>

                    <Tabs value={0}>
                        <Tab label='Servers' />
                        <Tab label='Infractions' />
                        <Tab label='Tickets' />
                        <Tab label='Admin' />
                    </Tabs>
                </Box>
            </Box>
        </>
    );
}
UserPage.auth = true;

export async function getServerSideProps(context){
    /** @type {User} */ const user = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/users/${context.params.user}`, { cache: 'no-cache', headers: { 'Cookie': context.req.headers.cookie } })
        .then(async response => await response.json())
        .catch(() => null);

    return { props: { user: user } };
}