// Next.jsのAPIルートで使用されるリクエストとレスポンスの型をインポート
import type { NextApiRequest, NextApiResponse } from 'next'

const crypto = require('crypto')

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).send('Method not allowed')
  if (!req.headers['x-microcms-signature']) return res.status(401).send('Invalid signature')

  const { id } = req.body;
  const signature = req.headers['x-microcms-signature'] as string
  // シークレット値とリクエストボディをハッシュ化
  const expectedSignature = crypto
    .createHmac('sha256', process.env.REVALIDATE_SECRET)
    .update(JSON.stringify(req.body))
    .digest('hex')

  if (signature !== expectedSignature) return res.status(401).send('Invalid signature')

  try {
    await res.revalidate(`/blog/${id},"/"`)
    return res.status(200).send('Revalidated')
  } catch (err) {
    return res.status(500).send('Error revalidating')
  }
}
