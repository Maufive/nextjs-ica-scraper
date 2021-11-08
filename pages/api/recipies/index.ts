import type { NextApiRequest, NextApiResponse } from 'next'
import chromium from 'chrome-aws-lambda';

import prisma from '../../../lib/prisma'
import { getSession } from 'next-auth/client'


// POST /api/recipies
// Required fields in body: url
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const { url } = req.body;

    if (!url || !url.trim()) {
        return res.json({
            status: 'error',
            error: 'Enter a valid URL'
        })
    }

    let browser = null;
    
    try {
        browser = await chromium.puppeteer.launch({
            args: chromium.args,
            defaultViewport: chromium.defaultViewport,
            executablePath: await chromium.executablePath,
            headless: chromium.headless,
            ignoreHTTPSErrors: true
        });

        let page = await browser.newPage();

        console.log(`Navigating to ${url}...`);

        await page.goto(url);

        await page.waitForSelector(".recipe-page-section");

        const title = await page.$eval('.recipe-header__title', text => text.textContent);
        const ratings = await page.$eval('.ratings > span', text => text.textContent);
        const imageSrc = await page.$eval('.recipe-header__desktop-image-wrapper__inner > img', img => img.src);
        const description = await page.$eval('.recipe-header__preamble > p', text => text.textContent);
        const time = await page.$eval('.recipe-header__summary > a', text => text.textContent.trim());
        const amountOfIngredients = await page.$eval('.recipe-header__summary > a:nth-child(2)', text => text.textContent.trim());
        const difficulty = await page.$eval('.recipe-header__summary > a:nth-child(3)', text => text.textContent.trim());
        
        const post = await prisma.recipe.create({
            data: {
                title,
                imageSrc,
                description,
                time,
                ratings,
                difficulty,
                amountOfIngredients
            }
        })
        
        console.log(post);

        res.json({
            title,
            imageSrc,
            description,
            time,
            ratings,
            difficulty,
            amountOfIngredients
        })
    } catch (error) {
        console.error(error);
    }

    // Do puppetteer stuff here
    

    // const session = await getSession({ req });
    //   const result = await prisma.recipe.create({
    //     data: {
    //       title: title
    //     //   author: { connect: { email: session?.user?.email } },
    //     },
    //   });
}
