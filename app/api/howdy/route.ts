import {NextRequest, NextResponse} from 'next/server'
import config from '@/utils/config'

export async function POST(req: NextRequest) {
  try {
    const {term} = await req.json()

    const res = await fetch(config('coursesApi'), {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'startRow': 0,
        'endRow': 0,
        'termCode': `${term}`,
        'publicSearch': 'Y',
      }),
      cache: 'force-cache',
      next: {
        revalidate: 60,
      },
    })

    const json = await res.json()

    return NextResponse.json(json)
  } catch (error) {
    return NextResponse.json({error})
  }
}